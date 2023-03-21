import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { backendStaticUserUrl } from '../Constants/constant';
import { deleteUserData } from '../Redux/Slicers/userSlice';

import { TfiMenu } from "react-icons/tfi";
import { VscChromeClose } from "react-icons/vsc";
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

  const [openNav, setOpenNav] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [show, setShow] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setUsername(userName);
    setUserphoto(userPhoto);

    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY < lastScrollY) {
          // if scroll down hide the navbar
          setShow(false);
        } else {
          // if scroll up show the navbar
          setShow(true);
        }
        // remember current page location to use in the next move
        setLastScrollY(window.scrollY);
      }
    };

    const bgColorChange = () =>
    window.scrollY >= 10 ? setScroll(true) : setScroll(false);

    if (typeof window !== "undefined") {
      // window.addEventListener("scroll", controlNavbar);
      window.addEventListener("scroll", bgColorChange);

      return () => {
        // window.removeEventListener("scroll", controlNavbar);
        window.removeEventListener("scroll", bgColorChange);
      };
    }
  }, []);

  const handleLogout = () => {
    logout();
    dispatch(deleteUserData());
  }
  

  return (
    <div className={`${scroll || openNav ? 'bg-primary' : 'bg-transparent`'} fixed top-0 w-full z-50 transition-all duration-700 ease-in-out`}>
      <div className="md:max-w-same m-auto flex justify-between md:justify-around items-center py-4  md:px-0 font-semibold  text-secondary font-sans">

        <div  className='flex items-center md:w-1/3 pl-4 md:pl-0'>

        {openNav ? (
            <VscChromeClose
              className="h-6 w-6 md:hidden  text-gray-500"
              onClick={() => setOpenNav(!openNav)}
            />
          ) : (
            <TfiMenu
              className="h-6 w-6 md:hidden text-gray-500"
              onClick={() => setOpenNav(!openNav)}
            />
          )}
          
          
          <div className="ml-2 md:ml-0 text-2xl md:text-3xl cursor-pointer font-mono">
            <Link to="/">
              StayHub
            </Link>
          </div>

        </div>

        <div className={`${openNav ? 'translate-y-0' : '-translate-y-96 md:translate-y-0'} absolute md:static top-16 flex md:justify-center w-full md:w-1/3 bg-primary md:bg-transparent px-4 md:px-0 border-2 border-t-secondary md:border-none transition-all duration-500 ease-in-out`}>

          <div className={`${scroll && 'md:shadow-md'} flex flex-col gap-4 md:gap-0 md:inline-block py-4 md:px-8 md:rounded-full cursor-pointer`}>
            <Link to="/">
              <span className='mr-4'>Home</span>
            </Link>

            <Link to="/homes">
              <span className='mr-4'>Houses</span>
            </Link>

            <Link to="/profile">
              <span className=''>Profile</span>
            </Link>

            <Link to="/myBookings">
              <span className='flex md:hidden'>Bookings</span>
            </Link>
          </div>
        </div>

        <div className="flex justify-end items-centers gap-4 cursor-pointer md:w-1/3 pr-4">

        {username ? 
          <div className='flex gap-2 items-center'>
            <Link to="/login">
              <span className="py-2 text-md md:text-base" onClick={handleLogout}>Logout</span>
            </Link>

            <Link to="/profile">
              <div className={`${scroll ? 'border-gray-200' : 'border-transparent'} py-1 px-2 pr-3 md:border-2 rounded-full flex gap-2 items-center`}>

                {userphoto &&
                  <img src={`${backendStaticUserUrl}/${userphoto}`} alt="profile" className='w-9 h-9 rounded-full' />
                }
                
                <span className='uppercase text-sm md:text-base md:flex hidden'>{username.split(' ')[0]}</span>

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
        </div>
      </div>
    </div>
  )
}

export default Navbar;