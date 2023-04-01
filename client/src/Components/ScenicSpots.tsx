import React, { lazy } from 'react'

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function ScenicSpots() {

  return (
    <div className='relative min-h-screen md:flex hidden'>

      <div className='m-auto flex flex-col'>
        <h1 className='mt-4 text-6xl font-semibold text-center mb-4 font-sans'>Scenic
        <span className='text-secondary'> Spots</span></h1>
        <p className='w-2/4 text-lg text-gray-500 m-auto'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti voluptas dolorem, cum eius porro ut doloremque. Commodi, dicta! Ullam, beatae.</p>
      </div>

      <div className='absolute h-72 top-18'>
        <LazyLoadImage
        alt={'scenicImage'}
        src={`src/assets/scenic-location-images/mountain-view.jpg`}
        effect="blur"
        className='rounded-xl h-72 w-full'
        />
      </div>

      <div className='absolute h-56 top-16 right-56'>
        <LazyLoadImage
        alt={'scenicImage'}
        src={'src/assets/scenic-location-images/lake-house.jpg'}
        effect="blur"
        className='h-56 rounded-xl w-full'
        />
      </div>

      <div className='absolute h-64 rounded-xl bottom-16 ml-32'>
        <LazyLoadImage
        alt={'scenicImage'}
        src={'src/assets/scenic-location-images/road-btw-woods.jpg'}
        effect="blur"
        className='h-64 rounded-xl w-full'
        />
      </div>

      <div className='absolute h-80 rounded-xl bottom-6 right-12'>
        <LazyLoadImage
        alt={'scenicImage'}
        src={'src/assets/scenic-location-images/house-boat.jpg'}
        effect="blur"
        className='h-80 rounded-xl w-full'
        />
      </div>
    </div>
  )
}

export default ScenicSpots;