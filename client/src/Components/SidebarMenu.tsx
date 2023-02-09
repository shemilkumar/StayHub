import React from 'react'

function SidebarMenu() {
  return (
    <div className='mt-20'>
      <ul className='uppercase flex flex-col gap-6 text-white font-lg pl-8'>
        <li className='p-2 rounded-full w-10/12 shadow-xl'>Settings</li>
        <li className='p-2'>My Bookings</li>
        <li className='p-2'>My Reviews</li>
        <li className='p-2'>Billing</li>
      </ul>
    </div>
  )
}

export default SidebarMenu;