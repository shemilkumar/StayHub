import React from 'react'
import BestSellers from '../Components/BestSellers';
import Feature from '../Components/Feature';
import Footer from '../Components/Footer';
import Hero from '../Components/Hero';
import Navbar from '../Components/Navbar';
import Testimonial from '../Components/Testimonial';

function Home() {
  return (
    <>
      <Navbar/>
      <div className='flex flex-col max-w-same m-auto'>
        <Hero/>
        <Feature/>
        <BestSellers/>
        <Testimonial/>
        <Footer/>
      </div>
    </>
  )
}

export default Home;