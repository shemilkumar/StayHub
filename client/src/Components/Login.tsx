import React, { FormEvent, useState } from 'react'
import { Link,useNavigate } from "react-router-dom";
import validator from '../util/validator';
import { IoIosEye, IoMdEyeOff } from "react-icons/io";
import apiRequest, { FetchChecked } from '../api/apiRequest';
import Alert from '../util/Alert';
import { useDispatch } from 'react-redux';
import { setUserData } from "../Redux/Slicers/userSlice";

function login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const userFromStrore = useSelector((state : any) => state.user.value);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error,setError] = useState<boolean>(false);
  const [apiError,setApiError] = useState<string>('');
  
  const clearInputs = ():void => {
    setEmail("");
    setPassword("");
  };

  const apiErrorSetting = (message : string):void => {
    setApiError(message);
    setTimeout(() => {
      setApiError('');
    }, 4000);
  }

  const handleLogin = async(e : FormEvent): Promise<void> => {
    e.preventDefault();

    const validatedInput = validator({email});

    if(validatedInput.pass){
      const result = await apiRequest.post('/users/login',{email,password}) as FetchChecked;

      if(result.pass){
        if(!result.fetchedData) return;
        // localStorage.setItem("token",result.fetchedData.data.token);
        localStorage.setItem("user",result.fetchedData.data.user!.name);
        localStorage.setItem("userPhoto",result.fetchedData.data.user!.photo);
        dispatch(setUserData(result.fetchedData.data.user!));
        clearInputs();
        navigate('/'); 
      }else apiErrorSetting(result.message ? result.message : 'Something went worng');

    }else apiErrorSetting(validatedInput.message);
  }

  return (
    <div className="min-h-screen flex flex-col bg-primary border-4">
        {apiError && <Alert message={apiError}/> }
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded-xl shadow-lg text-black
           w-full">

            <h1 className="mb-8 text-3xl text-center">Login</h1>
            <form className='m-auto' onSubmit={handleLogin}>
              <input
                type="text"
                className="block border-0 border-b-2 outline-none border-grey-light w-full p-3 rounded mb-4 dark:bg-white"
                name="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => {
                  setError(false);
                  setEmail(e.target.value);}}
               
                required
              />
              
              <div className='relative'>
                <input
                type={showPassword ? 'text' : 'password'}
                className="block border-0 border-b-2 outline-none border-grey-light w-full p-3 rounded mb-4 dark:bg-white"
                name="password"
                placeholder="password"
                value={password}
                onChange={(e) => {
                  setError(false);
                  setPassword(e.target.value);}}
                required
              />
              <div className="absolute top-0 right-0 mt-3 mr-3 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}>

              {showPassword ? <IoIosEye className='h-5 w-5'/>: <IoMdEyeOff className='h-5 w-5'/>}
              </div>
            </div>

            <p className={`${error ? 'opacity-100': 'opacity-0'} text-sm mb-2 text-red-500`}>Incorrect email or password</p>

          <button
            type="submit"
            className="w-full text-center py-3 font-semibold rounded bg-secondary text-white hover:bg-red-800 focus:outline-none my-1"
            // onClick={(e) => loginHandle(e)}
          >
            Login
          </button>

          <Link to={'/forgotPassword'}>
            <div className='flex justify-center mt-3'>
              <span className='px-2 hover:bg-blue-50 text-tertiary_2 text-sm cursor-pointer'>Forgot Password?</span>
            </div>
          </Link>

          <Link to="/signup">
          <div className="text-grey-dark mt-5 text-center">
            Don't have an account?{" "}
            <span className="font-semibold text-tertiary_2">Create one</span>
          </div>
          </Link>

        </form>

      </div>
    </div>
  </div>
  )
}

export default login;