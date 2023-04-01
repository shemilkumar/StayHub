import React from 'react'
import Footer from '../Components/Footer';
import MyBookings from '../Components/MyBookings';
import Navbar from '../Components/Navbar';

function MyBookingsPage() {

  return (
    <>
      <Navbar active='booking'/>
      <MyBookings/>
      <Footer/>
    </>
  )
}

export default MyBookingsPage;