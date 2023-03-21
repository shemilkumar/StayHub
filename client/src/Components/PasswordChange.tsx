import { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../api/apiRequest";
import { APIResponse } from "../Constants/modelTypes";
import Alert from "../util/Alert";
import validator from "../util/validator";
import Button from "./Elements/Button";

function PasswordChange(){

  const navigate = useNavigate();
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [passwordNew, setPasswordNew] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [validationError, setValidationError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const clearPasswords = () => {
    setPasswordCurrent('');
    setPasswordNew('');
    setPasswordConfirm('');
  }

  const apiErrorSetting = (message : string) =>{
    setValidationError(message);
    setTimeout(() => {
      setValidationError('');
    }, 4000);
  }
  
  const handleUpdatePassword = async(e : FormEvent): Promise<void> =>{
    e.preventDefault();

    const validatedResult = validator({password : passwordNew});

    if(validatedResult.pass){

      if(passwordNew !== passwordConfirm){
        apiErrorSetting('New password and Confirm password are not same');
        return;
      }

      const result = await apiRequest.patch('/users/updateMyPassword',{passwordCurrent,passwordNew,passwordConfirm}) as APIResponse | AxiosError;

      if(result instanceof AxiosError){
        if(result.name === 'AxiosError') apiErrorSetting(result.message);
        return;
      }

      if(result.data.status !== 'success') {
        apiErrorSetting(result.data.message);
        return
      }

      // console.log(result.data.data.user);
      setPasswordSuccess(true);
      setTimeout(() => {
        setPasswordSuccess(false);
      }, 4000);
      clearPasswords();

    }else{
      apiErrorSetting(validatedResult.message);
    }
    // console.log(name,email);
  }


  return(
    <div className='md:px-16'>
      {validationError && <Alert message={validationError}/> }  
      {passwordSuccess && <Alert message='Password updated successfuly' success={true}/> }  
      <h1 className='text-xl md:text-2xl uppercase mb-12 text-secondary font-semibold'>Change Password</h1>
      <form onSubmit={handleUpdatePassword}>

        <label htmlFor='currentPassword' className='font-semibold'>Current password</label>
        <input type='password' id='currentPassword' className='w-full p-4 text-sm text-gray-600 tracking-wide bg-gray-200 mb-8 mt-2 h-12 rounded-sm focus:border-b-secondary border-2 outline-none'
        value={passwordCurrent}
        onChange={(e) => setPasswordCurrent(e.target.value)}
        placeholder={'* * * * * * * *'}
        />

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
          <Button text='Save Password'/>
        </div>

      </form>
    </div>
  )
}

export default PasswordChange;