import React, { ChangeEvent, FormEvent, useState } from 'react'
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import apiRequest, { FetchChecked } from '../api/apiRequest';
import Button from './Elements/Button';
import { APIResponse,User } from '../Constants/modelTypes';
import { backendStaticUserUrl } from '../Constants/constant';
import validator from '../util/validator';
import Alert from '../util/Alert';


function SettingsChange({user} : {user: User}) {

  // const navigate = useNavigate();
  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const [photo, setPhoto] = useState<File>();

  const [validationError, setValidationError] = useState<string>('');

  const onSelectFile = (e : ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files || e.target.files.length === 0) return;
    setPhoto(e.target.files[0]);
  };
  
  const apiErrorSetting = (message : string): void =>{
    setValidationError(message);
    setTimeout(() => {
      setValidationError('');
    }, 4000);
  };

  // console.log(`${backendStaticUserUrl}${user.photo}`);
  
  const handleUpdate = async(e : FormEvent): Promise<void> =>{
    e.preventDefault();

    const validatedResult = validator({email});
    // console.log(validatedResult);
    if(validatedResult.pass){

      const form = new FormData();
      form.append('name', name);
      form.append('email', email);

      if(photo) form.append('photo',photo);
      else form.append('photo','');

      // console.log(form);
      const result = await apiRequest.patch('/users/updateMe',form) as FetchChecked;

      if(result.pass){
        if(!result.fetchedData) return;

         // console.log(result.data.data.user);
        localStorage.setItem("user",result.fetchedData.data.data.user!.name);
        localStorage.removeItem('/users/me');
        window.location.reload();

      }else apiErrorSetting(result.message!);
     
    }else apiErrorSetting(validatedResult.message);
  };

  return (
    <>
      <div className='md:px-16'>
        {validationError && <Alert message={validationError}/> }  
        <h1 className='text-xl md:text-2xl uppercase mt-4 md:mt-0 mb-8 md:mb-12 text-secondary font-semibold'>Your Account Settings</h1>
        <form encType="multipart/form-data" onSubmit={handleUpdate}>

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

          <div className='flex gap-4 items-center w-full'>
            
            <img src={`${backendStaticUserUrl}/${user.photo}`} alt="profile" 
            className='w-20 h-20 object-cover rounded-full border-2 border-secondary p-0.5'/>
            

            <div className=''>
              <input type="file" accept='image/*' className='opacity-0 overflow-hidden absolute -z-1 focus:outline-[3px] focus:outline focus:outline-secondary text-secondary inline-block border-b-2 border-secondary p-1 cursor-pointer transition-all duration-150 w-1/2 md:w-full'
              onChange={onSelectFile}/>

              <label htmlFor="photo" className='md:outline-[3px] outline-secondary text-secondary inline-block border-b-2 border-secondary p-1 transition-all duration-150 cursor-pointer hover:bg-secondary hover:transform hover:translate-y-[-2px]'>Choose new photo</label>
            </div>

          </div>

          <span className='mt-8 flex justify-end rounded-full'>
            <span className='rounded-full'>
              <Button text='Save Settings'/>
            </span>
          </span>

        </form>
      </div>
    </>
  )
}

export default SettingsChange;