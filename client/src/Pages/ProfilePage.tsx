import React from 'react'
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import Profile from '../Components/Profile';


function ProfilePage() {
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