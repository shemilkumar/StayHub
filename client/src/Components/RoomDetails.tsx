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
import { HomeModel } from '../Constants/modelTypes';


function RoomDetails({home} : {home: HomeModel}) {

  return (
    <>
      {
        home && 
        <div>
          <ImageCarousel /> 
          <div className='mt-16 mb-12'>

            <div className='w-3/4 mb-8'>
              <h1 className='text-4xl font-semibold'>{home.name}</h1>
              <div className='flex gap-2 text-sm text-gray-600'>
                <h4>{home.maxGuests} Guests</h4>
                <h4>{home.bedrooms} Bedrooms</h4>
                <h4>{home.beds} Beds</h4>
                <h4>{home.bathrooms} Bathrooms</h4>
              </div>
            </div>

            <div className='text-xl p-3 bg-green-700 text-white font-semibold inline-flex items-center gap-2 rounded-lg'>
            {home.ratingsAverage}
              <AiFillStar/>
            </div>

            <div className='text-gray-500 text-sm'>{home.ratingsQuantity} Reviews</div>

            <div>
              <h1 className='mt-10 font-semibold text-2xl'>Description</h1>
              <p className='text-base text-gray-500 w-3/4'>{home.summary}</p>
            </div>

            <div>
              <h1 className='mt-10 mb-6 font-semibold text-2xl'>Amenities</h1>
              <div className='w-3/4 grid grid-cols-3 gap-y-4'>

                <div className='flex gap-2 items-center text-lg text-gray-700'>
                  <input type="checkbox" readOnly={true} checked={home.perks.kitchen} className='h-4 w-4 text-green-600'/>
                  <TbToolsKitchen2 className='h-6 w-6'/>
                  <p>Kitchen</p>
                </div>

                <div className='flex gap-2  items-center text-lg  text-gray-700'>
                  <input type="checkbox" readOnly={true} checked={home.perks.wifi} className='h-4 w-4 text-green-600'/>
                  <BiWifi className='h-6 w-6'/>
                  <p>Wifi</p>
                </div>

                <div className='flex gap-2 items-center text-lg  text-gray-700'>
                  <input type="checkbox" readOnly={true} checked={home.perks.pool} className='h-4 w-4 text-green-600'/>
                  <MdPool className='h-6 w-6'/>
                  <p>Pool</p>
                </div>

                <div className='flex gap-2  items-center text-lg  text-gray-700'>
                  <input type="checkbox" readOnly={true} checked={home.perks.parking} className='h-4 w-4 text-green-600'/>
                  <AiFillCar className='h-6 w-6' />
                  <p>Parking</p>
                </div>

                <div className='flex gap-2 items-center text-lg  text-gray-700'>
                  <input type="checkbox" readOnly={true} checked={home.perks.washingMachine} className='h-4 w-4 text-green-600'/>
                  <GiWashingMachine className='h-6 w-6' />
                  <p>Washing Machine</p>
                </div>

                <div className='flex gap-2  items-center text-lg  text-gray-700'>
                  <input type="checkbox" readOnly={true} checked={home.perks.ac} className='h-4 w-4 text-green-600'/>
                  <GiCooler className='h-6 w-6' />
                  <p>AC</p>
                </div>

                <div className='flex gap-2  items-center text-lg  text-gray-700'>
                  <input type="checkbox" readOnly={true} checked={home.perks.fridge} className='h-4 w-4 text-green-600'/>
                  <BiFridge className='h-6 w-6' />
                  <p>Fridge</p>
                </div>

                <div className='flex gap-2  items-center text-lg  text-gray-700'>
                  <input type="checkbox" readOnly={true} checked={home.perks.dryer} className='h-4 w-4 text-green-600'/>
                  <MdDry className='h-6 w-6' />
                  <p>Dryer</p>
                </div>

                <div className='flex gap-2  items-center text-lg  text-gray-700'>
                  <input type="checkbox" readOnly={true} checked={home.perks.tv} className='h-4 w-4 text-green-600'/>
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
                  <h2 className='px-4 py-1 font-bold text-2xl shadow-lg rounded-full shadow-green-600'>{home.checkIn.join(' ')}</h2>
                </div>

                <div className='flex flex-col'>
                  <span className='px-4 text-red-600 font-bold'>Check-out</span>
                  <h2 className='px-4 py-1 font-bold text-2xl shadow-lg rounded-full shadow-red-600'>{home.checkOut.join(' ')}</h2>
                </div>
              </div>

              <ul className='text-base text-gray-800 list-disc pl-8'>
                <li>Smoking is {home.rules.smoking ? '' : 'not'} allowed</li>
                <li>Pets are {home.rules.pets ? '' : 'not'} allowed</li>
                <li>Party is {home.rules.parties ? '' : 'not'} allowed</li>

                <li>Only Indian Nationals allowed</li>
                <li>Guests must check in using any local or outstation ID proof.</li>
              </ul>
            </div>

            <div className='mt-8'>
              <h1 className='font-semibold text-2xl mb-4'>Where you’ll be</h1>
              {/* 77.58345359320708,12.96947682403109 */}
              <Map latitude={home.location[0]} longitude={home.location[1]}/>

              <div className='text-base text-gray-600 mt-8 w-3/4'>
                <p className='text-xl mb-2'>{home.address}</p>
                <div>
                {home.addressDescription.split(',').map((line,i) => {
                  return (
                    <p key={i}>{line}</p>
                  )
                })}
                </div>
              </div>
            </div>

            <div className='mt-16'>
              <h1 className='font-semibold text-3xl mb-4'>Similar Homes</h1>
              <div className='mt-4 grid grid-cols-3 gap-2'>
                {/* <Card/>
                <Card/>
                <Card/> */}
              </div>
            </div>

          </div>  
        </div>
      }
    </>
  )
}

export default RoomDetails;