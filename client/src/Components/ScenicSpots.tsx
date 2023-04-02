import React, { lazy } from 'react'

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import HouseboatImage from '../assets/scenic-location-images/house-boat.jpg';
import LakeHouseImage from '../assets/scenic-location-images/lake-house.jpg';
import MountainImage from '../assets/scenic-location-images/mountain-view.jpg';
import WoodRouteImage from '../assets/scenic-location-images/road-btw-woods.jpg';


function ScenicSpots() {

  return (
    <div className='relative min-h-screen md:flex hidden mt-20'>

      <div className='flex flex-col gap-2'>
        <div className='flex justify-between'>

          <div className='w-1/3'>
            <LazyLoadImage
            alt={'scenicImage'}
            // src={`src/assets/scenic-location-images/mountain-view.jpg`}
            src={MountainImage}
            effect="blur"
            className='rounded-xl w-full'
            />
          </div>

          <div className='w-1/3 mt-24 mr-24'>
            <LazyLoadImage
            alt={'scenicImage'}
            // src={'src/assets/scenic-location-images/lake-house.jpg'}
            src={LakeHouseImage}
            effect="blur"
            className='w-full rounded-xl'
            />
          </div>
        </div>

        <div>
          <div className='m-auto flex flex-col'>
            <h1 className='mt-4 text-6xl font-semibold text-center mb-4 font-sans'>Scenic
            <span className='text-secondary'> Spots</span></h1>
            <p className='w-2/4 text-lg text-gray-500 m-auto'>Escape to stunning scenery with our unbeatable home bookings. Relax in luxury at the heart of nature. Book now for an unforgettable getaway!</p>
          </div>
        </div>

        <div className='flex justify-between'>

          <div className='flex justify-center w-1/2 mt-4'>
            <div className='w-2/3'>
              <LazyLoadImage
              alt={'scenicImage'}
              // src={'src/assets/scenic-location-images/road-btw-woods.jpg'}
              src={WoodRouteImage}
              effect="blur"
              className='rounded-xl'
              />
            </div>
          </div>

          <div className='flex justify-end w-1/3 mt-24'>
            <LazyLoadImage
            alt={'scenicImage'}
            // src={'src/assets/scenic-location-images/house-boat.jpg'}
            src={HouseboatImage}
            effect="blur"
            className='rounded-xl w-full'
            />
          </div>
        </div>
      </div>
     
    </div>
  )
}

export default ScenicSpots;