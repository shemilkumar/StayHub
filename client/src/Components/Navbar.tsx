import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { backendStaticUserUrl } from '../Constants/constant';
import { deleteUserData } from '../Redux/Slicers/userSlice';
import logout from '../util/logout';

function Navbar() {

  interface User {
    _id: number,
    name: string,
    email: string,
  }

  const dispatch = useDispatch();

  // const userName = localStorage.getItem("user")?.replace(/['"]+/g, '');
  const userName = localStorage.getItem("user") as string;
  const userPhoto = localStorage.getItem("userPhoto") as string;
  const [username, setUsername] = useState<string | null>(userName);
  const [userphoto, setUserphoto] = useState<string | null>(userPhoto);

  useEffect(() => {
    setUsername(userName);
    setUserphoto(userPhoto);
  }, []);

  const handleLogout = () => {
    logout();
    dispatch(deleteUserData());
  }
  

  return (
    <div className='fixed top-0 w-full z-50'>
      <div className="max-w-same m-auto flex justify-around items-center p-4 font-semibold bg-primary text-secondary">
        <div  className='w-1/3'>
          <Link to="/">
            <div className="text-3xl cursor-pointer font-mono">StayHub</div>
          </Link>
        </div>

        <div className='w-1/3 flex justify-center'>
          <div className="inline-block shadow-md py-4 px-8 rounded-full cursor-pointer">
            <Link to="/">
              <span className='mr-4'>Home</span>
            </Link>

            <Link to="/homes">
              <span className='mr-4'>Houses</span>
            </Link>

            <Link to="/profile">
              <span className=''>Profile</span>
            </Link>
          </div>
        </div>

        <div className="flex justify-end items-centers gap-4 cursor-pointer w-1/3">

        {username ? 
          <div className='flex gap-2 items-center'>
            <Link to="/login">
              <span className="py-2" onClick={handleLogout}>Logout</span>
            </Link>

            <Link to="/profile">
              <div className='py-1 px-2 pr-3 border-2 border-gray-200 rounded-full flex gap-2 items-center'>

                {userphoto &&
                  <img src={`${backendStaticUserUrl}/${userphoto}`} alt="profile" className='w-9 h-9 rounded-full' />
                }
                
                <span className='uppercase'>{username.split(' ')[0]}</span>

              </div>
            </Link>
          </div> 
          :
          <div className='flex gap-2'>
            <Link to="/login">
              <span className="py-2">Login</span>
            </Link>
            
            <Link to="/signup">
              <span className='py-2 px-4 border-2 border-gray-300 rounded-full hover:bg-secondary hover:text-white hover:border-secondary'>SignUp</span>
            </Link>

          </div>
        }
        
        
        {/* <div className='flex gap-2 items-center'>
          <Link to="/login">
            <span className="py-2">Logout</span>
          </Link>

          <Link to="/profile">
            <div className='py-2 px-3 border-2 border-gray-300 rounded-full flex gap-4 items-center'>

            <img src="https://dummyimage.com/302x302" alt="profile" className='w-9 h-9 rounded-full' />
            <span className='uppercase'>Shemil</span>

            </div>
          </Link>
        </div> */}

        </div>
      </div>
    </div>
  )
}

export default Navbar;


// import React, { useState, useEffect } from "react";

// const Navbar = () => {
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const [navbarVisible, setNavbarVisible] = useState(true);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollPos = window.pageYOffset;
//       if (currentScrollPos > scrollPosition) {
//         setNavbarVisible(false);
//       } else {
//         setNavbarVisible(true);
//       }
//       setScrollPosition(currentScrollPos);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [scrollPosition]);

//   return (
//     <nav
//       className={`fixed w-full z-50 top-0 ${
//         navbarVisible ? "transition ease-in duration-500" : "hidden"
//       }`}
//     >
//       <div className="container mx-auto px-4 h-16 flex items-center justify-between">
//         <a href="#" className="font-bold text-xl">
//           Your logo
//         </a>
//         <ul className="flex">
//           <li>
//             <a href="#" className="block px-3 py-2">
//               Home
//             </a>
//           </li>
//           <li>
//             <a href="#" className="block px-3 py-2">
//               About
//             </a>
//           </li>
//           <li>
//             <a href="#" className="block px-3 py-2">
//               Contact
//             </a>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;