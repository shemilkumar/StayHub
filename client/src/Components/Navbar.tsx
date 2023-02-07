import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='fixed w-full'>
      <div className="flex justify-around items-center p-4 font-semibold bg-primary text-secondary">
        <div className="text-3xl cursor-pointer">StayHub</div>
        <div className="flex gap-4 shadow-md py-4 px-8 rounded-full cursor-pointer">
          <span className=''>Home</span>
          <span>Houses</span>
          <span>About</span>
        </div>
        <div className="flex items-centers gap-4 cursor-pointer">
        <Link to="/login">
          <span className="py-2">Login</span>
        </Link>
        <Link to="/signup">
          <span className='py-2 px-4 border-2 border-gray-300 rounded-full hover:bg-secondary hover:text-white hover:border-secondary'>SignUp</span>
        </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar;