import React from 'react'
import {MdLocationOn} from "react-icons/md"
import {BsHouseDoorFill} from "react-icons/bs"
import {FaBed} from "react-icons/fa"

function Card() {
  return (
    <div>
      <div className="w-96 shadow-2xl rounded-xl">
        <div>
          <img src="src/assets/House-Images/house-1-cover.webp" alt="house1" 
          className='shadow-xl rounded-t-lg'/>
        </div>
        <div className='flex flex-col gap-4 mt-8 border-b-2 items-center'>
          <h1 className='text-3xl font-semibold text-center'>Chao Pao Villa</h1>
          <p className='text-gray-400 text-md w-10/12 '>Fall in love with Villa Chao Pao, the perfect place for a pure evasion.</p>
          <div className='flex justify-between m-2 w-10/12'>
            <div className='flex gap-2 '>
              <BsHouseDoorFill className='h-5 w-5 text-secondary'/>
              <p className='text-gray-500'>5 Rooms</p>
             </div>
            <div className='flex gap-2'>
              <FaBed className='h-5 w-5 text-secondary'/>
              <p className='text-gray-500'>10 Beds</p>
            </div>
          </div>
        </div>

        <div className='flex justify-between py-4 w-10/12 m-auto'>
          <div className='font-semibold text-xl text-tertiary_2'>$1233</div>
          <div className='flex'>
            <MdLocationOn className='h-5 w-5'/>
            <p className='text-gray-400'>Surat Thani, Thailand</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card;