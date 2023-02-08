import React from 'react'
import Feature from '../Components/Feature';
import Footer from '../Components/Footer';
import Hero from '../Components/Hero';
import HouseSection from '../Components/HouseSection';
import Navbar from '../Components/Navbar';

function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <Feature/>
      <HouseSection/>
      <Footer/>
    </>
  )
}

export default Home;