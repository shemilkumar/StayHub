import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import Profile from '../Components/Profile';


function ProfilePage() {

  const navigate = useNavigate();

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if(!localUser) navigate('/login')
  }, []);


  return (
    <>
    <Navbar/>
    <div className='min-h-screen pt-40 pb-32'>
      <Profile/>
    </div>
    <Footer/>
    </>
  )
}

export default ProfilePage;