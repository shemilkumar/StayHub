import { AxiosError } from 'axios';
import React, { FormEvent, useState } from 'react'
import apiRequest from '../api/apiRequest';
import Button from '../Components/Elements/Button';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { APIResponse } from '../Constants/modelTypes';
import Alert from '../util/Alert';

function ForgotPasswordPage() {

  const [email, setEmail] = useState('');
  const [userFound, setUserFound] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [emailButton, setEmailButton] = useState('Continue');

  const apiErrorSetting = (message : string) => {
    setValidationError(message);
    setTimeout(() => {
      setValidationError('');
    }, 4000);
  }

  const handleEmailSubmit = async(e: FormEvent) =>{
    e.preventDefault();
    // console.log("email");
    setEmailButton('Loading...');

    const response = await apiRequest.post(`/users/forgotPassword`,{email}) as APIResponse | AxiosError;

    if(response instanceof AxiosError){
      if(response.name === 'AxiosError') apiErrorSetting(response.message);
      setEmailButton('Continue');
      return;
    }

    if(response.data.status !== 'success') {
      apiErrorSetting(response.data.message);
      setEmailButton('Continue');
      return
    }

    setUserFound(true);
  }

  return (
    <div>
      <Navbar/>
        <div className='min-h-screen flex'>
          {validationError && <Alert message={validationError}/> }
          {/* {!userFound ? */}
          <div className='m-auto w-1/3 '>
              <div className={`transition-all duration-700 ease-in-out ${userFound ? '-translate-y-[600px] opacity-0 fixed' : ''}`}>
              
              <h1 className='text-2xl uppercase mb-12 text-secondary font-semibold'>Reset Password</h1>

              <form onSubmit={handleEmailSubmit}>
                <label htmlFor='email' className='font-semibold'>Email address</label>
                <input type='email' id='email' className='w-full p-4 text-sm text-gray-600 tracking-wide bg-gray-200 mb-8 mt-2 h-12 rounded-sm focus:border-b-secondary border-2 outline-none'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <div className='mt-6 flex justify-end'>
                  <Button text={emailButton}/>
                </div>
              </form>
            </div>
            {/* : */}
            <div className={`p-10 transition-all duration-700 ease-in-out ${userFound ? '' : 'translate-y-[600px] opacity-0 fixed'}`}>
              <h1 className='font-serif font-semibold text-5xl text-tertiary_2'>Check your mail!</h1>
              <p className='mt-4 text-lg text-gray-600'>Reset password link send to your email address
              <span className='text-tertiary_2'>{` (${email}).`}</span></p>
            </div>
          </div>
          {/* } */}

          </div>
      <Footer/>
    </div>
  )
}

export default ForgotPasswordPage;