import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useApi from '../api/useApi';
import PasswordChange from '../Components/PasswordChange';
import SettingsChange from '../Components/SettingsChange';
import SidebarMenu from '../Components/SidebarMenu';
import { User } from '../Constants/modelTypes';
import Spinner from './Spinner';

function Profile() {

  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>();
  const [apiError, setApiError] = useState('');

  const endpoint = '/users/me';
  const {data ,error} = useApi('GET',endpoint);
  // console.log(data,error);

  useEffect(() => {

    const localUser = localStorage.getItem(endpoint);
    if(localUser){
      setUser(JSON.parse(localUser).data);
    }

    if(data) {
      setUser(data.data);
    }

    if(error){
      setApiError(error);
      navigate(`/error/${error}`);
    }
  }, [data,error]);

  return (
    <div>
      {user ? 
      <div className='flex'>
        <div className='m-auto w-[63%]'>
          <div className='grid grid-cols-4 bg-white shadow-2xl'>
            <div className='row-span-2 bg-gradient-to-b from-rose-500 via-red-500 to-secondary'>
              <SidebarMenu/>
            </div>
            <div className='col-start-2 col-span-3 px-32 py-20'>
              <SettingsChange user={user}/>
            </div>
            <div className='col-start-2 col-span-3  px-32 py-20'>
              <PasswordChange/>
            </div>
          </div>
        </div>
      </div>
      :
      <Spinner/>}
    </div>
  )
}

export default Profile