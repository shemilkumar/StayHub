import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { backendStaticUserUrl } from '../Constants/constant';
import { deleteUserData } from '../Redux/Slicers/userSlice';

import { TfiMenu } from "react-icons/tfi";
import { VscChromeClose } from "react-icons/vsc";
import logout from '../util/logout';
import { User } from '../Constants/modelTypes';

function Navbar({active}:{active?: string}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userFromStrore = useSelector((state : any) => state.user.value) as User;

  const [userName, setUserName] = useState<string | null>(userFromStrore.name);
  const [userPhoto, setUserPhoto] = useState<string | null>(userFromStrore.photo);

  const [openNav, setOpenNav] = useState<boolean>(false);
  const [scroll, setScroll] = useState<boolean>(false);

  useEffect(() => {
    if(userFromStrore.name){
      setUserName(userFromStrore.name);
      setUserPhoto(userFromStrore.photo);
    }

    const bgColorChange = (): void =>
    window.scrollY >= 10 ? setScroll(true) : setScroll(false);

    if (typeof window !== "undefined") {
      // window.addEventListener("scroll", controlNavbar);
      window.addEventListener("scroll", bgColorChange);

      return () => {
        // window.removeEventListener("scroll", controlNavbar);
        window.removeEventListener("scroll", bgColorChange);
      };
    }
  }, [userName]);

  const handleLogout = async(): Promise<void> => {
    const res = await logout();
    if(res){
      dispatch(deleteUserData());
      navigate('/login');
    }
    else navigate('/error/Please try again !');
  }

  return (
    <div className={`${scroll || openNav ? 'bg-primary' : 'bg-transparent`'} fixed top-0 w-full z-50 transition-all duration-700 ease-in-out`}>
      <div className="md:max-w-same m-auto flex justify-between md:justify-around items-center py-4  md:px-0 md:font-semibold  text-secondary font-sans">

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
          
          {/* {
            scroll ?
              <div className="ml-2 md:ml-0 text-2xl md:text-3xl cursor-pointer font-mono">
                <Link to="/">
                  StayHub
                </Link>
              </div>
            :
              <Link to="/">
                <img src="/logo/logo_icon.png" alt="" className='h-10 aspect-square'/>
              </Link>
          } */}

              <div className="ml-2 md:ml-0 text-2xl md:text-3xl cursor-pointer font-mono">
                <Link to="/">
                  StayHub
                </Link>
              </div>

        </div>

        <div className={`${openNav ? 'translate-y-0' : '-translate-y-96 md:translate-y-0'} absolute md:static top-16 flex md:justify-center w-full md:w-1/3 bg-primary md:bg-transparent px-4 md:px-0 border-2 border-t-secondary md:border-none transition-all duration-500 ease-in-out text-black md:text-secondary`}>

          <div className={`${scroll && 'md:shadow-md'} flex flex-col gap-8 md:gap-0 md:inline-block py-4 md:px-8 md:rounded-full cursor-pointer font-semibold`}>
            <Link to="/">
              <span className={`${active === 'home' && 'text-secondary'} md:mr-4`}>Home</span>
            </Link>

            <Link to="/homes">
              <span className={`${active === 'houses' && 'text-secondary'} md:mr-4`}>Houses</span>
            </Link>

            <Link to="/profile">
              <span className={`${active === 'profile' && 'text-secondary'} md:mr-4`}>Profile</span>
            </Link>

            <Link to="/myBookings">
              <span className={`${active === 'booking' && 'text-secondary'} md:mr-4 flex md:hidden`}>Bookings</span>
            </Link>
          </div>
        </div>

        <div className="flex justify-end items-centers gap-4 cursor-pointer md:w-1/3 pr-4">

        {userName ? 
          <div className='flex gap-2 items-center'>
            <Link to="/loading">
              <span className="py-2 text-md md:text-base" onClick={handleLogout}>Logout</span>
            </Link>

            <Link to="/profile">
              <div className={`${scroll ? 'border-gray-200' : 'border-transparent'} py-1 px-2 pr-3 md:border-2 rounded-full flex gap-2 items-center`}>

                {userPhoto &&
                  <img src={`${backendStaticUserUrl}/${userPhoto}`} alt="profile" className='w-9 h-9 rounded-full' />
                }
                
                <span className='uppercase text-sm md:text-base md:flex hidden'>{userName.split(' ')[0]}</span>

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