import React, { lazy,Suspense } from 'react'
const BestSellers = lazy(() => import('../Components/BestSellers'));
const ScenicSpots = lazy(() => import('../Components/ScenicSpots'));

// import BestSellers from '../Components/BestSellers';
// import ScenicSpots from '../Components/ScenicSpots';
import FeatureBlock from '../Components/FeatureBlock';
import Footer from '../Components/Footer';
import Hero from '../Components/Hero';
import Navbar from '../Components/Navbar';
import SearchForm from '../Components/SearchForm';
import Testimonial from '../Components/Testimonial';
import Spinner from '../Components/Spinner';

function Home() {
  return (
    <>
      <Navbar active='home'/>
      <Hero/>
      <div className='flex flex-col md:max-w-same m-auto'>
        <SearchForm/>
        <FeatureBlock/>  

        <Suspense fallback={<Spinner/>}>
          <ScenicSpots/>
        </Suspense>

        <Suspense fallback={<Spinner/>}>
          <BestSellers/>
        </Suspense>

        <Testimonial/>
      </div>
      <Footer/>
    </>
  )
}

export default Home;