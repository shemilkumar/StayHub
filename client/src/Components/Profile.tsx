import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PasswordChange from '../Components/PasswordChange';
import SettingsChange from '../Components/SettingsChange';
import SidebarMenu from '../Components/SidebarMenu';
import { APIResponse, User } from '../Constants/modelTypes';
import Spinner from './Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from "../Redux/Slicers/userSlice";
import apiRequest, { FetchChecked } from '../api/apiRequest';
import { AxiosError } from 'axios';
import { StateFromReducersMapObject } from '@reduxjs/toolkit';

function Profile() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userFromStrore = useSelector((state : any) => state.user.value);

  const [user, setUser] = useState<User | null>();
  const [apiError, setApiError] = useState('');

  const fetchCurrentUser = async() =>{
    const result = await apiRequest.get('/users/me') as FetchChecked;

    if(result.pass){
      if(!result.fetchedData) return
      setUser(result.fetchedData.data.data);
      dispatch(setUserData(result.fetchedData.data.data));

    }else navigate(`/error/${result.message}`);
  }

  useEffect(() => {
    if(userFromStrore.name === '') fetchCurrentUser();
    else setUser(userFromStrore);
  }, []);


  return (
    <>
      {user ? 
      <div className='flex md:px-0'>
        <div className='m-auto md:w-[63%]'>
          <div className='grid grid-cols-1 md:grid-cols-4 bg-white md:shadow-2xl'>
            <div className='hidden md:block md:row-span-2 bg-gradient-to-b from-rose-500 via-red-500 to-secondary'>
              <SidebarMenu/>
            </div>
            <div className='md:col-start-2 md:col-span-3 px-4 py-4 md:px-32 md:py-20'>
              <SettingsChange user={user}/>
            </div>
            <div className='md:col-start-2 md:col-span-3 px-4 py-4 md:px-32 md:py-20'>
              <PasswordChange/>
            </div>
          </div>
        </div>
      </div>
      :
      <Spinner/>}
    </>
  )
}

export default Profile