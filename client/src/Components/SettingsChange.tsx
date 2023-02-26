import { AxiosError } from 'axios';
import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import apiRequest from '../api/apiRequest';
import Button from './Elements/Button';
import { APIResponse,User } from '../Constants/modelTypes';
import validator from '../util/validator';
import Alert from '../util/Alert';

function SettingsChange({user} : {user: User}) {

  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const [validationError, setValidationError] = useState('');

  const apiErrorSetting = (message : string) =>{
    setValidationError(message);
    setTimeout(() => {
      setValidationError('');
    }, 4000);
  }
  
  const handleUpdate = async(e : FormEvent): Promise<void> =>{
    e.preventDefault();

    const validatedResult = validator({email});

    if(validatedResult.pass){

      const result = await apiRequest.patch('/users/updateMe',{name,email}) as APIResponse | AxiosError;

      if(result instanceof AxiosError){
        if(result.name === 'AxiosError') apiErrorSetting(result.message);
        return;
      }

      if(result.data.status !== 'success') {
        apiErrorSetting(result.data.message);
        return
      }

      // console.log(result.data.data.user);
      localStorage.setItem("user",result.data.data.user!.name);
      localStorage.removeItem('/users/me');
      window.location.reload();

    }else{
      apiErrorSetting(validatedResult.message);
    }
    // console.log(name,email);
  }

  return (
    <>
      <div className='px-16'>
        {validationError && <Alert message={validationError}/> }  
        <h1 className='text-2xl uppercase mb-12 text-secondary font-semibold'>Your Account Settings</h1>
        <form>

          <label htmlFor='name' className='font-semibold'>Name</label>
          <input type='text' id='name' className='w-full p-4 text-sm text-gray-600 tracking-wide bg-gray-200 mb-8 mt-2 h-12 rounded-sm focus:border-b-secondary border-2 outline-none'
          defaultValue={user?.name}
          onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor='email' className='font-semibold'>Email address</label>
          <input type='email' id='email' className='w-full p-4 text-sm text-gray-600 tracking-wide bg-gray-200 mb-8 mt-2 h-12 rounded-sm focus:border-b-secondary border-2 outline-none'
          defaultValue={user?.email}
          onChange={(e) => setEmail(e.target.value)}
          />

          {/* 
          <Input id='name' type='text' label='Name' value={user?.name} />
          <Input id='email' type='email' label='Email address' value={user?.email}/> */}

          <div className='flex gap-4 items-center'>
            <div className='w-20 h-20 rounded-full border-4'></div>
            
            <div className=''>
              <input type="file" accept='image/*' className='opacity-0 overflow-hidden absolute -z-1 focus:outline-[3px] focus:outline focus:outline-secondary text-secondary inline-block border-b-2 border-secondary p-1 cursor-pointer transition-all duration-150'/>

              <label htmlFor="photo" className='outline-[3px] outline-secondary text-secondary inline-block border-b-2 border-secondary p-1 transition-all duration-150 cursor-pointer hover:bg-secondary hover:transform hover:translate-y-[-2px]'>Choose new photo</label>
            </div>

          </div>

          <span className='mt-8 flex justify-end rounded-full'>
            <span className='rounded-full' onClick={handleUpdate}>
              <Button text='Save Settings'/>
            </span>
          </span>

        </form>
      </div>
    </>
  )
}

export default SettingsChange;