import React, { useEffect, useState,lazy } from 'react'
const BestSellers = lazy(() => import('../Components/BestSellers'));
// const ScenicSpots = lazy(() => import('../Components/ScenicSpots'));

// import BestSellers from '../Components/BestSellers';
import ScenicSpots from '../Components/ScenicSpots';
import FeatureBlock from '../Components/FeatureBlock';
import Footer from '../Components/Footer';
import Hero from '../Components/Hero';
import Navbar from '../Components/Navbar';
import SearchForm from '../Components/SearchForm';
import Testimonial from '../Components/Testimonial';

function Home() {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.onload = () => setLoaded(true);
  }, []);

  // return (
  //   <>
  //     {
  //       loaded ?
  //       <div>
  //         <Navbar/>
  //         <Hero/>
  //         <div className='flex flex-col md:max-w-same m-auto'>
  //           <SearchForm/>
  //           <FeatureBlock/>  
  //           <ScenicSpots/>
  //           <BestSellers/> 
  //           <Testimonial/>
  //         </div>
  //         <Footer/>
  //       </div>
  //       :
  //       <div className='min-h-screen flex justify-center items-center'>
  //         <Spinner/>
  //       </div>
  //     }
  //   </>
  // )

  return (
    <>
      <Navbar active='home'/>
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