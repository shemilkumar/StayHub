import React from 'react'
import { TbDiscount2 } from "react-icons/tb";
import { MdFreeCancellation } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
      
function FeatureBlock() {
  return (
    <div>
      <div className='grid grid-cols-1 gap-4 md:gap-0 md:grid-cols-3 md:mt-24 mt-16 px-4 md:px-0'>

        <div className='flex gap-4 justify-around'>
          <div className='h-20 w-1/12 md:w-20 flex md:items-center justify-center'>
          <MdFreeCancellation className='h-14 w-14 text-green-500'/>
          </div>
          <div className="w-10/12 md:w-3/4">
            <h1 className='text-xl md:text-3xl font-semibold'>Free cancellation</h1>
            <p className='text-gray-400 text-md md:text-xl mt-1 md:mt-4 w-11/12 md:w-3/4'>Flexible bookings on most hotels</p>
          </div>
        </div> 

        <div className='flex gap-4 justify-around'>
          <div className='h-20 w-1/12 md:w-20 flex md:items-center justify-center'>
            <TbDiscount2 className='h-14 w-14 text-secondary'/>
          </div>
          <div className="w-10/12 md:w-3/4">
            <h1 className='text-xl md:text-3xl font-semibold'>Unlock instant savings</h1>
            <p className='text-gray-400 text-md md:text-xl mt-1 md:mt-4 w-11/12 md:w-3/4'>Save an average of 15% on every booking with Member Prices</p>
          </div>
        </div>

        <div className='flex gap-4 justify-around'>
          <div className='h-20 w-1/12 md:w-20 flex md:items-center justify-center'>
            <BiSupport className='h-14 w-14 text-secondary'/>
          </div>
          <div className="w-10/12 md:w-3/4">
            <h1 className='text-xl md:text-3xl font-semibold'>24x7 support</h1>
            <p className='text-gray-400 text-md md:text-xl mt-1 md:mt-4  w-11/12 md:w-3/4'>New price? New plan? No problem. We’re here to help, 24/7.</p>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default FeatureBlock;