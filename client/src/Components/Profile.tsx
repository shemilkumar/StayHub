import React from 'react'
import PasswordChange from '../Components/PasswordChange';
import SettingsChange from '../Components/SettingsChange';
import SidebarMenu from '../Components/SidebarMenu';

function Profile() {
  return (
    <div className='flex'>
      <div className='m-auto w-[63%]'>
        <div className='grid grid-cols-4 bg-white shadow-2xl'>
          <div className='row-span-2 bg-gradient-to-b from-rose-500 via-red-500 to-secondary'>
            <SidebarMenu/>
          </div>
          <div className='col-start-2 col-span-3 px-32 py-20'>
            <SettingsChange/>
          </div>
          <div className='col-start-2 col-span-3  px-32 py-20'>
            <PasswordChange/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile