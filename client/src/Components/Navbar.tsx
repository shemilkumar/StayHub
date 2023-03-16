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
    window.scrollY >= 100 ? setScroll(true) : setScroll(false);

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
    <div className={`${scroll ? 'bg-primary' : 'bg-transparent`'} fixed top-0 w-full z-50`}>
      <div className="max-w-same m-auto flex justify-around items-center py-4 font-semibold  text-secondary font-sans">
        <div  className='w-1/3'>
          <Link to="/">
            <div className="text-3xl cursor-pointer font-mono">StayHub</div>
          </Link>
        </div>

        <div className='w-1/3 flex justify-center'>
          <div className={`${scroll && 'shadow-md'} inline-block py-4 px-8 rounded-full cursor-pointer`}>
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
        </div>
      </div>
    </div>
  )
}

export default Navbar;