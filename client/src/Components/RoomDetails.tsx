import React from 'react'
import ImageCarousel from './ImageCarousel';

import { AiFillStar,AiFillCar } from "react-icons/ai";
import { TbToolsKitchen2 } from "react-icons/tb";
import { BiWifi,BiFridge } from "react-icons/bi";
import { MdDry,MdPool } from "react-icons/md";
import { FiMonitor } from "react-icons/fi";
import {GiWashingMachine, GiCooler } from "react-icons/gi";
import Map from './Map';
import Card from './Card';


function RoomDetails() {

  return (
    <>
      <ImageCarousel /> 
      <div className='mt-16 mb-12'>

        <div className='w-3/4 mb-8'>
          <h1 className='text-4xl font-semibold'>Chao Pao Villa</h1>
          <div className='flex gap-2 text-sm text-gray-600'>
            <h4>14 Guests</h4>
            <h4>5 Bedrooms</h4>
            <h4>10 Beds</h4>
            <h4>6 Bathrooms</h4>
          </div>
        </div>

        <div className='text-xl p-3 bg-green-700 text-white font-semibold inline-flex items-center gap-2 rounded-lg'>
          4.5
          <AiFillStar/>
        </div>

        <div className='text-gray-500 text-sm'>1211 Reviews</div>

        <div>
          <h1 className='mt-10 font-semibold text-2xl'>Description</h1>
          <p className='text-base text-gray-500 w-3/4'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam voluptatibus ea provident, assumenda quis molestias perferendis placeat numquam necessitatibus minus.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam voluptatibus ea provident, assumenda quis molestias perferendis placeat numquam necessitatibus minus.</p>
        </div>

        <div>
          <h1 className='mt-10 mb-6 font-semibold text-2xl'>Amenities</h1>
          <div className='w-3/4 grid grid-cols-3 gap-y-4'>

            <div className='flex gap-2 items-center text-lg text-gray-700'>
              <input type="checkbox" readOnly={true} checked={true} className='h-4 w-4 text-green-600'/>
              <TbToolsKitchen2 className='h-6 w-6'/>
              <p>Kitchen</p>
            </div>

            <div className='flex gap-2  items-center text-lg  text-gray-700'>
              <input type="checkbox" readOnly={true} checked={true} className='h-4 w-4 text-green-600'/>
              <BiWifi className='h-6 w-6'/>
              <p>Wifi</p>
            </div>

            <div className='flex gap-2 items-center text-lg  text-gray-700'>
              <input type="checkbox" readOnly={true} checked={false} className='h-4 w-4 text-green-600'/>
              <MdPool className='h-6 w-6'/>
              <p>Pool</p>
            </div>

            <div className='flex gap-2  items-center text-lg  text-gray-700'>
              <input type="checkbox" readOnly={true} checked={true} className='h-4 w-4 text-green-600'/>
              <AiFillCar className='h-6 w-6' />
              <p>Parking</p>
            </div>

            <div className='flex gap-2 items-center text-lg  text-gray-700'>
              <input type="checkbox" readOnly={true} checked={false} className='h-4 w-4 text-green-600'/>
              <GiWashingMachine className='h-6 w-6' />
              <p>Washing Machine</p>
            </div>

            <div className='flex gap-2  items-center text-lg  text-gray-700'>
              <input type="checkbox" readOnly={true} checked={true} className='h-4 w-4 text-green-600'/>
              <GiCooler className='h-6 w-6' />
              <p>AC</p>
            </div>

            <div className='flex gap-2  items-center text-lg  text-gray-700'>
              <input type="checkbox" readOnly={true} checked={false} className='h-4 w-4 text-green-600'/>
              <BiFridge className='h-6 w-6' />
              <p>Fridge</p>
            </div>

            <div className='flex gap-2  items-center text-lg  text-gray-700'>
              <input type="checkbox" readOnly={true} checked={true} className='h-4 w-4 text-green-600'/>
              <MdDry className='h-6 w-6' />
              <p>Dryer</p>
            </div>

            <div className='flex gap-2  items-center text-lg  text-gray-700'>
              <input type="checkbox" readOnly={true} checked={true} className='h-4 w-4 text-green-600'/>
              <FiMonitor className='h-6 w-6' />
              <p>TV</p>
            </div>
          </div>
        </div>

        <div className='mt-10 mb-10'>
          <h1 className='mb-4 font-semibold text-2xl'>Rules</h1>

          <div className='flex gap-8 mb-8'>
            <div className='flex flex-col'>
              <span className='px-4 text-green-600 font-bold'>Check-in</span>
              <h2 className='px-4 py-1 font-bold text-2xl shadow-lg rounded-full shadow-green-600'>3:00 PM</h2>
            </div>

            <div className='flex flex-col'>
              <span className='px-4 text-red-600 font-bold'>Check-out</span>
              <h2 className='px-4 py-1 font-bold text-2xl shadow-lg rounded-full shadow-red-600'>10:00 AM</h2>
            </div>
          </div>

          <ul className='text-base text-gray-800 list-disc pl-8'>
            <li>Smoking is not allowed</li>
            <li>Pets is not allowed</li>
            <li>Party is not allowed</li>

            <li>Only Indian Nationals allowed</li>
            <li>Guests must check in using any local or outstation ID proof.</li>
          </ul>
        </div>

        <div className='mt-8'>
          <h1 className='font-semibold text-2xl mb-4'>Where you’ll be</h1>
          <Map latitude={9.962941994396857} longitude={76.24738758288964}/>

          <div className='text-base text-gray-600 mt-8 w-3/4'>
            <p className='text-xl mb-2'>Address ipsum dolor sit amet.</p>
            <p>summary Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum nobis vero illum ad, magni vel expedita, voluptate culpa quidem, dolorem laborum! Quae rem voluptatem explicabo, necessitatibus quod laudantium labore distinctio!</p>
          </div>
        </div>

        <div className='mt-16'>
          <h1 className='font-semibold text-3xl mb-4'>Similar Homes</h1>
          <div className='mt-4 grid grid-cols-3 gap-2'>
            <Card/>
            <Card/>
            <Card/>
          </div>
        </div>

      </div>  
    </>
  )
}

export default RoomDetails;