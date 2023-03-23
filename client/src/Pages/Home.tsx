import React from 'react'
import BestSellers from '../Components/BestSellers';
import ScenicSpots from '../Components/ScenicSpots';
import FeatureBlock from '../Components/FeatureBlock';
import Footer from '../Components/Footer';
import Hero from '../Components/Hero';
import Navbar from '../Components/Navbar';
import SearchForm from '../Components/SearchForm';
import Testimonial from '../Components/Testimonial';

function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <div className='flex flex-col md:max-w-same m-auto'>
        <SearchForm/>
        <FeatureBlock/>  
        <ScenicSpots/>
        <BestSellers/> 
        <Testimonial/>
      </div>
      <Footer/>
    </>
  )
}

export default Home;