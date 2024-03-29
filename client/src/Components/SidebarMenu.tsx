import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SidebarMenu() {

  const navigate = useNavigate();
  const [active, setActive] = useState<string>('settings');

  return (
    <div className='md:mt-20 py-4'>
      <ul className='uppercase flex flex-col gap-6 text-white font-lg pl-8'>

        <li className={`${active === 'settings' ? 'rounded-full shadow-xl' : ''} p-2 w-10/12 cursor-pointer`} onClick={() => setActive('settings')}>Settings</li>

        <li className={`${active === 'bookings' ? 'rounded-full shadow-xl' : ''} p-2 w-10/12 cursor-pointer`}  
        onClick={() => {
          setActive('bookings');
          navigate('/myBookings');
        }}>My Bookings</li>

        <li className={`${active === 'reviews' ? 'rounded-full shadow-xl' : ''} p-2 w-10/12 cursor-pointer hidden md:flex`}  onClick={() => setActive('reviews')}>My Reviews</li>

        <li className={`${active === 'billing' ? 'rounded-full shadow-xl' : ''} p-2 w-10/12 cursor-pointer hidden md:flex`}  onClick={() => setActive('billing')}>Billing</li>
      </ul>
    </div>
  )
}

export default SidebarMenu;