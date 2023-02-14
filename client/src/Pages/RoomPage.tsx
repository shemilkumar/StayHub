import React from 'react'
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import RoomComponents from '../Components/RoomComponents';

function RoomPage() {
  return (
    <>
      <Navbar/>

      <div className='mt-24 max-w-same flex m-auto justify-between gap-4 relative'>
        <RoomComponents/>
      </div>

      <Footer/>
    </>
  )
}

export default RoomPage;