import React, { FormEvent, useState } from 'react'
import { Link,useNavigate } from "react-router-dom";
import validator from '../util/validator';
import { IoIosEye, IoMdEyeOff } from "react-icons/io";

function login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error,setError] = useState(false);

  const clearInputs = ():void => {
    setEmail("");
    setPassword("");
  }

  const handleLogin = (e : FormEvent): void => {
    e.preventDefault();

    const validatedInput = validator({email});
    console.log(validatedInput);

    if(validatedInput.pass){
      // Logic for Login TODO
      if(email === 'shemil@gmail.com' && password === 'Password@1001'){
        clearInputs();
        console.log('Login working..');
        navigate('/');
        return;
      }
      setError(true);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-primary dark:bg-gray-900">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded-xl shadow-lg text-black dark:text-teal-50 w-full dark:bg-gray-900">

            <h1 className="mb-8 text-3xl text-center">Login</h1>
            <form className='m-auto' onSubmit={handleLogin}>
              <input
                type="text"
                className="block border-0 border-b-2 outline-none border-grey-light w-full p-3 rounded mb-4 dark:bg-gray-900"
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
                className="block border-0 border-b-2 outline-none border-grey-light w-full p-3 rounded mb-4 dark:bg-gray-900"
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

          <Link to="/signup">
          <div className="text-grey-dark mt-6 dark:text-teal-50 text-center">
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