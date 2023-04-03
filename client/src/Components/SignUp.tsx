import React, { FormEvent, useRef, useState } from 'react'
import {Link, useNavigate} from "react-router-dom";
import validator from '../util/validator';
import { IoIosEye, IoMdEyeOff } from "react-icons/io";
import apiRequest, { FetchChecked } from '../api/apiRequest';
import Alert from '../util/Alert';
import { setUserData } from '../Redux/Slicers/userSlice';
import { useDispatch } from 'react-redux';

function SignUp() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [passwordMatch, setpasswordMatch] = useState<boolean>(true);
  const [apiError,setApiError] = useState<string>('');
  
  const [error, setError] = useState<boolean>(false);
  const [showPassword,setShowPassword] = useState<boolean>(false);

  const clearInputs = ():void => {
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
  }

    const apiErrorSetting = (message : string):void => {
    setApiError(message);
    setTimeout(() => {
      setApiError('');
    }, 4000);
  }

  const handleSignUp = async(e: FormEvent): Promise<void> => {
    e.preventDefault();

    // Confirm passord with original password
    // if condition is false -> immediate return
    password === passwordConfirm && setpasswordMatch(true);

    if(password !== passwordConfirm){
      setpasswordMatch(false);
      passwordConfirmRef.current!.focus();
      return;
    }

    // Validate inputs
    const validateResult = validator({email,password}); 

    // If validation is successfull then signup otherwise immediate return
    if(validateResult.pass){

      const result = await apiRequest.post('/users/signup',{
        name,  
        email,
        password,
        passwordConfirm
      }) as FetchChecked;

      if(result.pass){
        if(!result.fetchedData) return;
        // localStorage.setItem("token",result.fetchedData.data.token);
        localStorage.setItem("user",result.fetchedData.data.user!.name);
        localStorage.setItem("userPhoto",result.fetchedData.data.user!.photo);
        dispatch(setUserData(result.fetchedData.data.user!));
        clearInputs();
        navigate('/'); 
      }else apiErrorSetting(result.message ? result.message : 'Something went worng');

    }else{
      apiErrorSetting(validateResult.message);
      setError(true);
      if(validateResult.prop === 'email') emailRef.current?.focus();
      if(validateResult.prop === 'password') passwordRef.current?.focus()
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-primary">
        {apiError && <Alert message={apiError}/> }
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded-xl shadow-lg text-black w-full">

            <h1 className="mb-8 text-3xl text-center">SignUp</h1>
            <form className='m-auto' onSubmit={handleSignUp}>
           
              <input
                type="text"
                className="block border-0 border-b-2 outline-none border-grey-light w-full p-3 rounded mb-4 dark:bg-white"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                className={`${error ? 'focus:border-red-500' : ''} block border-0 border-b-2 outline-none border-grey-light w-full p-3 rounded mb-4 dark:bg-white`}
                name="email"
                placeholder="email@example.com"
               value={email}
               ref={emailRef}
               onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              <div className='relative'>
                <input
                type="password"
                className={`${error ? 'focus:border-red-500' : ''} block border-0 border-b-2 outline-none border-grey-light w-full p-3 rounded mb-4 dark:bg-white`}
                name="password"
                placeholder="password"
                ref={passwordRef}
                value={password}
                onChange={(e) =>{
                  setpasswordMatch(true);
                  setPassword(e.target.value);}}
                required
                />
              </div>

          <div className='relative'>
            <input
            type={showPassword ? "text" : "password"}
            className={`${passwordMatch ? '' : 'border-red-400'} block border-0 border-b-2 outline-none w-full p-3 mb-1 dark:bg-white`}
            name="passwordConfirm"
            placeholder="Confirm password"
            ref={passwordConfirmRef}
            value={passwordConfirm}
            onChange={(e) => {
              setpasswordMatch(true);
              setPasswordConfirm(e.target.value);}}
            required
            />
            <div className="absolute top-0 right-0 mt-3 mr-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}>

            {showPassword ? <IoIosEye className='h-5 w-5'/>: <IoMdEyeOff className='h-5 w-5'/>}
            </div>
          </div>

          <p className={`${passwordMatch ? 'opacity-0': 'opacity-100'} text-sm mb-2 text-red-500`}>Passwords are not matching</p>

          <button
            type="submit"
            className="w-full text-center py-3 font-semibold rounded bg-secondary text-white hover:bg-red-800 focus:outline-none my-1"
            // onClick={(e) => handleSignUp(e)}
          >
            Sign Up
          </button>

          <div className="text-center text-sm text-gray-500 mt-4">
            By signing up, you agree to the{" "}
            <a
              className="no-underline border-b border-grey-500 text-grey-500"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              className="no-underline border-b border-grey-500 text-grey-500"
              href="#"
            >
              Privacy Policy
            </a>
          </div>

          <Link to="/login">
            <div className="text-grey-dark mt-6 text-center">
              Already have an account?{" "}
              <span className="font-semibold text-tertiary_2">Login</span>
            </div>
          </Link>

        </form>

      </div>
    </div>
  </div>
  )
}

export default SignUp