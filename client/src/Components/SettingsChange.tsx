import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import apiRequest from '../api/apiRequest';
import ErrorPage from '../Pages/ErrorPage';
import Button from './Elements/Button';
import Input from './Elements/Input';
import { APIResponse,User } from '../Constants/modelTypes';
import apiErrorCheck from '../api/apiErrorCheck';

function SettingsChange({user} : {user: User}) {

  // const endpoint = '/users/me';
  // const {data ,error} = useApi('GET',endpoint);
  // const navigate = useNavigate();

  // const [user, setUser] = useState<User | null>();
  // const [error, setError] = useState('');

  // useEffect(() => {
  //   const getUser = async() => {
  //     try {
  //       const response = await apiRequest.get('/users/me') as APIResponse | AxiosError;
  //       // setUser(response.data);
  //       // console.log(response.data);

  //       // const responseCheckResult : string | APIResponse = apiErrorCheck(response);
  //       // if(typeof responseCheckResult === 'object') setUser(response.data.data);
  //       // else{
  //       //   setError(responseCheckResult);
  //       //   navigate(`/error/${responseCheckResult}`)
  //       // }

  //       if(response instanceof AxiosError){
  //         if(response.name === 'AxiosError'){
  //           setError(response.message);
  //           navigate(`/error/${response.message}`);
  //         }
  //         return;
  //       }
  
  //       if(response.data.status !== 'success') {
  //         setError(response.data.message);
  //         navigate(`/error/${response.data.message}`);
  //         return
  //       }

  //       console.log(user);

  //     } catch (error) {
  //       navigate('/login');
  //     }
  //   }

  //   if(!user) getUser();
  //   console.log(user);

  // }, [user]);
  

  return (
    <>
        <div className='px-16'>
          <h1 className='text-2xl uppercase mb-12 text-secondary font-semibold'>Your Account Settings</h1>
          <form>

            <Input id='name' type='text' label='Name' value={user?.name}/>
            <Input id='email' type='email' label='Email address' value={user?.email}/>

            <div className='flex gap-4 items-center'>
              <div className='w-20 h-20 rounded-full border-4'></div>
              
              <div className=''>
                <input type="file" accept='image/*' className='opacity-0 overflow-hidden absolute -z-1 focus:outline-[3px] focus:outline focus:outline-secondary text-secondary inline-block border-b-2 border-secondary p-1 cursor-pointer transition-all duration-150'/>

                <label htmlFor="photo" className='outline-[3px] outline-secondary text-secondary inline-block border-b-2 border-secondary p-1 transition-all duration-150 cursor-pointer hover:bg-secondary hover:transform hover:translate-y-[-2px]'>Choose new photo</label>
              </div>

            </div>

            <div className='mt-8 flex justify-end'>
              <Button text='Save Settings'/>
            </div>

          </form>
      </div>
    </>
  )
}

export default SettingsChange;