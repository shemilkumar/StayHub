import { AxiosError } from 'axios';
import React, { FormEvent, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import apiRequest, { FetchChecked } from '../api/apiRequest';
import Button from '../Components/Elements/Button';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { APIResponse } from '../Constants/modelTypes';
import Alert from '../util/Alert';
import validator from '../util/validator';

function ResetPasswordPage() {

  const navigate = useNavigate();
  const {resetToken} = useParams();

  const [passwordNew, setPasswordNew] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [validationError, setValidationError] = useState('');

  const apiErrorSetting = (message : string) => {
    setValidationError(message);
    setTimeout(() => {
      setValidationError('');
    }, 4000);
  }

  const clearInputs = () =>{
    setPasswordNew('');
    setPasswordConfirm('');
  }

  const handleSubmit = async(e: FormEvent) =>{
    e.preventDefault();

    console.log(passwordNew, passwordConfirm);
    const validateResult = validator({password: passwordNew});
    
    if(validateResult.pass){

      if(passwordNew !== passwordConfirm){
        apiErrorSetting('Passwords are not match');
        clearInputs();
        return;
      }

      const result = await apiRequest.post(`/users/resetPassword/${resetToken}`,{
        password: passwordNew,
        passwordConfirm
      }) as FetchChecked;

      if(result.pass){
        if(!result.fetchedData) return;
        localStorage.setItem("token",result.fetchedData.data.token);
        localStorage.setItem("user",result.fetchedData.data.user!.name);
        navigate('/'); 
  
      }else{
        apiErrorSetting(result.message!);
        clearInputs();
      }
    }
    else apiErrorSetting(validateResult.message);
  }

  return (
    <>
      <Navbar/>
        <div className='min-h-screen flex'>
          {validationError && <Alert message={validationError}/> }
          <div className='m-auto md:w-1/3 px-4 md:px-0'>
            
            <h1 className='text-2xl uppercase mb-12 text-secondary font-semibold'>Reset Password</h1>

            <form onSubmit={handleSubmit}>
              <label htmlFor='newPassword' className='font-semibold'>New password</label>
              <input type='password' id='newPassword' className='w-full p-4 text-sm text-gray-600 tracking-wide bg-gray-200 mb-8 mt-2 h-12 rounded-sm focus:border-b-secondary border-2 outline-none'
              value={passwordNew} 
              onChange={(e) => setPasswordNew(e.target.value)}
              placeholder={'* * * * * * * *'}
              />

              <label htmlFor='confirmPassword' className='font-semibold'>Confirm password</label>
              <input type='password' id='confirmPassword' className='w-full p-4 text-sm text-gray-600 tracking-wide bg-gray-200 mb-8 mt-2 h-12 rounded-sm focus:border-b-secondary border-2 outline-none'
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder={'* * * * * * * *'}
              />

              <div className='mt-8 flex justify-end'>
                <Button text='Reset Password'/>
              </div>
            </form>

          </div>
        </div>
      <Footer/>
    </>
  )
}

export default ResetPasswordPage;