import React from 'react'
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import Profile from '../Components/Profile';


function ProfilePage() {
  return (
    <>
      <Navbar active='profile'/>
      <div className='md:min-h-screen pt-20 md:pt-40 md:pb-32'>
        <Profile/>
      </div>
      <Footer/>
    </>
  )
}

export default ProfilePage;