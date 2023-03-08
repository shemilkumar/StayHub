import React from 'react'
import SearchForm from './SearchForm';
import FeatureBlock from './FeatureBlock';
import HeroBlock from '../util/HeroBlock';
import image from "../assets/scenic-location-images/house-boat.jpg";

function Feature() {

  const description: String = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti voluptas dolorem, cum eius porro ut doloremque. Commodi, dicta! Ullam, beatae.'

  return (
    <div className='min-h-screen'>
      {/* <SearchForm/> */}
      <FeatureBlock/>  
      <div className='flex-row-reverse'>
        <HeroBlock image={image} description={description} subHeading={"Scenic Spots"} switchFlex={true}/>   
      </div> 
    </div>
  )
}

export default Feature;