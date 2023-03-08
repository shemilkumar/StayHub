import React, { useState } from 'react'

function SidebarMenu() {

  const [active, setActive] = useState('settings');

  return (
    <div className='mt-20'>
      <ul className='uppercase flex flex-col gap-6 text-white font-lg pl-8'>
        <li className={`${active === 'settings' ? 'rounded-full shadow-xl' : ''} p-2 w-10/12`} onClick={() => setActive('settings')}>Settings</li>
        <li className={`${active === 'bookings' ? 'rounded-full shadow-xl' : ''} p-2 w-10/12`}  onClick={() => setActive('bookings')}>My Bookings</li>
        <li className={`${active === 'reviews' ? 'rounded-full shadow-xl' : ''} p-2 w-10/12`}  onClick={() => setActive('reviews')}>My Reviews</li>
        <li className={`${active === 'billing' ? 'rounded-full shadow-xl' : ''} p-2 w-10/12`}  onClick={() => setActive('billing')}>Billing</li>
      </ul>
    </div>
  )
}

export default SidebarMenu;