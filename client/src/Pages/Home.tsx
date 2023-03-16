import React from 'react'
import BestSellers from '../Components/BestSellers';
import Feature from '../Components/Feature';
import Footer from '../Components/Footer';
import Hero from '../Components/Hero';
import Navbar from '../Components/Navbar';
import SearchForm from '../Components/SearchForm';
import Testimonial from '../Components/Testimonial';
import Alert from '../util/Alert';

function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <div className='flex flex-col max-w-same m-auto'>
        <SearchForm/>
        <Feature/>
        <BestSellers/>
        <Testimonial/>
        <Footer/>
      </div>
    </>
  )
}

export default Home;