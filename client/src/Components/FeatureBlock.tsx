import React from 'react'
import { TbDiscount2 } from "react-icons/tb";
import { MdFreeCancellation } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
      
function FeatureBlock() {
  return (
    <div>

      <div className='grid grid-cols-3 mt-24'>

          <div className='flex gap-4 items-center justify-center'>
            <MdFreeCancellation className='text-center h-14 w-14 text-green-500 rounded-full'/>
            <div className="">
              <h1 className='text-3xl font-semibold'>Free cancellation</h1>
              <p className='text-gray-400 text-xl mt-4 w-3/4'>Flexible bookings on most hotels*</p>
            </div>
          </div> 

        <div className='flex gap-4 items-center justify-center'>
          <TbDiscount2 className='text-center h-20 w-20 text-secondary rounded-full'/>
          <div className="">
            <h1 className='text-3xl font-semibold'>Unlock instant savings</h1>
            <p className='text-gray-400 text-xl mt-4 w-3/4'>Save an average of 15% on every booking with Member Prices</p>
          </div>
        </div>

        <div className='flex gap-4 items-center justify-center'>
          <BiSupport className='text-center h-16 w-16 text-secondary rounded-full'/>
          <div className="">
            <h1 className='text-3xl font-semibold'>24x7 support</h1>
            <p className='text-gray-400 text-xl mt-4 w-3/4'>New price? New plan? No problem. We’re here to help, 24/7.</p>
          </div>
        </div>
        
      </div>

    </div>
  )
}

export default FeatureBlock;