import { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest, { FetchChecked } from "../api/apiRequest";
import { APIResponse } from "../Constants/modelTypes";
import Alert from "../util/Alert";
import validator from "../util/validator";
import Button from "./Elements/Button";

function PasswordChange(){

  const navigate = useNavigate();
  const [passwordCurrent, setPasswordCurrent] = useState<string>('');
  const [passwordNew, setPasswordNew] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const [validationError, setValidationError] = useState<string>('');
  const [passwordSuccess, setPasswordSuccess] = useState<boolean>(false);

  const clearPasswords = (): void => {
    setPasswordCurrent('');
    setPasswordNew('');
    setPasswordConfirm('');
  }

  const apiErrorSetting = (message : string): void =>{
    setValidationError(message);
    setTimeout(() => {
      setValidationError('');
    }, 4000);
  }

  const passwordSuccessSettings = (): void =>{
    setPasswordSuccess(true);
    setTimeout(() => {
      setPasswordSuccess(false);
    }, 4000);
    clearPasswords();
  }
  
  
  const handleUpdatePassword = async(e : FormEvent): Promise<void> =>{
    e.preventDefault();

    const validatedResult = validator({password : passwordNew});

    if(validatedResult.pass){

      if(passwordNew !== passwordConfirm){
        apiErrorSetting('New password and Confirm password are not same');
        return;
      }

      const result = await apiRequest.patch('/users/updateMyPassword',{passwordCurrent,passwordNew,passwordConfirm}) as FetchChecked;

      if(result.pass){
        if(!result.fetchedData) return;
        passwordSuccessSettings();

      }else apiErrorSetting(result.message!);

    }else apiErrorSetting(validatedResult.message);
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