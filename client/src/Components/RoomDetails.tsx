import React from 'react'
import ImageCarousel from './ImageCarousel';

import { AiFillStar } from "react-icons/ai";


function RoomDetails() {
  return (
    <>
      <ImageCarousel /> 
      <div className='mt-16 mb-24'>
        <p className='text-4xl font-semibold w-3/4 mb-8'>Chao Pao Villa</p>

        <div className='text-xl p-3 bg-green-700 text-white font-semibold inline-flex items-center gap-2 rounded-lg'>
          4.5
          <AiFillStar/>
        </div>

        <div className='text-gray-500 text-sm'>1211 Reviews</div>

        <div className='mt-10 font-semibold text-xl'>Description</div>

      </div>  
    </>
  )
}

export default RoomDetails;