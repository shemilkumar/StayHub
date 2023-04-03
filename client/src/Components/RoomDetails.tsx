import React,{Suspense, lazy} from 'react'
import ImageCarousel from './ImageCarousel';
import { HomeModel } from '../Constants/modelTypes';
import Map from "./Map";

import { AiFillStar,AiFillCar } from "react-icons/ai";
import { TbToolsKitchen2 } from "react-icons/tb";
import { BiWifi,BiFridge } from "react-icons/bi";
import { MdDry,MdPool } from "react-icons/md";
import { FiMonitor } from "react-icons/fi";
import {GiWashingMachine, GiCooler } from "react-icons/gi";
import Spinner from './Spinner';

// const Map = lazy(() => import('./Map'));

function RoomDetails({home} : {home: HomeModel}) {

  return (
    <>
      {
        home && 
        <>
          <div className='h-72 md:h-full'>
             <ImageCarousel home={home}/>
          </div>
          <div className='mt-6 md:mt-16 mb-8 md:mb-12 px-4 md:px-0'>

            <div className='w-full md:w-3/4 mb-2 md:mb-8'>
              <h1 className='text-4xl font-semibold'>{home.name}</h1>
              <div className='flex gap-2 text-sm text-gray-600'>
                <h4>{home.maxGuests} Guests</h4>
                <h4>{home.bedrooms} Bedrooms</h4>
                <h4>{home.beds} Beds</h4>
                <h4>{home.bathrooms} Bathrooms</h4>
              </div>
            </div>

            
            <div className='text-base md:text-xl p-1.5 md:p-3 bg-green-700 text-white font-semibold inline-flex items-center gap-2 rounded-lg'>
            {home.ratingsAverage}
              <AiFillStar/>
            </div>
            <div className='text-gray-500 text-sm'>{home.ratingsQuantity} Reviews</div>

            <div>
              <h1 className='mt-6 mb-2 md:mt-10 font-semibold text-2xl'>Description</h1>
              <p className='text-sm md:text-base text-gray-500 md:w-3/4'>{home.summary}</p>
            </div>

            <div>
              <h1 className='mt-10 mb-6 font-semibold text-2xl'>Amenities</h1>

              <div className='md:w-3/4 grid grid-cols-3 text-xs md:text-lg gap-y-4'>

                <div className='flex gap-2 items-center text-gray-700'>
                  <input type="checkbox" readOnly={true} checked={home.perks.kitchen} className='h-4 w-4 text-green-600'/>
                  <TbToolsKitchen2 className='h-6 w-6'/>
                  <p>Kitchen</p>
                </div>

                <div className='flex gap-2  items-center text-gray-700'>
                  <input type="checkbox" readOnly={true} checked={home.perks.wifi} className='h-4 w-4 text-green-600'/>
                  <BiWifi className='h-6 w-6'/>
                  <p>Wifi</p>
                </div>

                <div className='flex gap-2 items-center  text-gray-700'>
                  <input type="checkbox" readOnly={true} checked={home.perks.pool} className='h-4 w-4 text-green-600'/>
                  <MdPool className='h-6 w-6'/>
                  <p>Pool</p>
                </div>

                <div className='flex gap-2  items-center  text-gray-700'>
                  <input type="checkbox" readOnly={true} checked={home.perks.parking} className='h-4 w-4 text-green-600'/>
                  <AiFillCar className='h-6 w-6' />
                  <p>Parking</p>
                </div>

                <div className='flex gap-2 items-center  text-gray-700'>
                  <input type="checkbox" readOnly={true} checked={home.perks.washingMachine} className='h-4 w-4 text-green-600'/>
                  <GiWashingMachine className='h-6 w-6' />
                  <p>Washing</p>
                </div>

                <div className='flex gap-2  items-center text-gray-700'>
                  <input type="checkbox" readOnly={true} checked={home.perks.ac} className='h-4 w-4 text-green-600'/>
                  <GiCooler className='h-6 w-6' />
                  <p>AC</p>
                </div>

                <div className='flex gap-2  items-center  text-gray-700'>
                  <input type="checkbox" readOnly={true} checked={home.perks.fridge} className='h-4 w-4 text-green-600'/>
                  <BiFridge className='h-6 w-6' />
                  <p>Fridge</p>
                </div>

                <div className='flex gap-2  items-center  text-gray-700'>
                  <input type="checkbox" readOnly={true} checked={home.perks.dryer} className='h-4 w-4 text-green-600'/>
                  <MdDry className='h-6 w-6' />
                  <p>Dryer</p>
                </div>

                <div className='flex gap-2  items-center  text-gray-700'>
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

              <ul className='text-sm md:text-base text-gray-800 list-disc pl-8'>
                <li>Smoking is {home.rules.smoking ? '' : 'not'} allowed</li>
                <li>Pets are {home.rules.pets ? '' : 'not'} allowed</li>
                <li>Party is {home.rules.parties ? '' : 'not'} allowed</li>

                <li>Only Indian Nationals allowed</li>
                <li>Guests must check in using any local or outstation ID proof.</li>
              </ul>
            </div>

            <div className='mt-8'>
              <h1 className='font-semibold text-2xl mb-4'>Where you’ll be</h1>

              {/* <Suspense fallback={<Spinner/>}>
                <Map latitude={home.location.coordinates[0]} longitude={home.location.coordinates[1]}/>
              </Suspense> */}
              <Map latitude={home.location.coordinates[0]} longitude={home.location.coordinates[1]}/>

              <div className='text-sm md:text-base text-gray-600 mt-8 md:w-3/4'>
                <p className='text-xl mb-2'>{home.address}</p>
                <ul className='flex flex-col gap-2 md:gap-0'>
                {home.addressDescription.split(',').map((line,i) => {
                  return (
                    <li key={i}>{line}</li>
                  )
                })}
                </ul>
              </div>
            </div>
          </div>  
        </>
      }
    </>
  )
}

export default RoomDetails;