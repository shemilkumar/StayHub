import React from 'react';
import {MdLocationOn} from "react-icons/md";
import {BsHouseDoorFill} from "react-icons/bs";
import {FaBed} from "react-icons/fa";
import { Link } from 'react-router-dom';
import { HomeModel } from "../Constants/modelTypes";
import { backendStaticHomesUrl } from '../Constants/constant';
import { AiFillStar } from 'react-icons/ai';

function Card( {home} : {home:HomeModel}) {

  // console.log(home.imageCover);

  return (
    <div>
    { home &&
      <Link to={home?._id ? `/home/${home._id}` : 'room/fake_id'}>
        <div className="w-full md:w-96 shadow-2xl md:rounded-xl transition-all ease-in-out duration-500 hover:scale-105">
          <div className='h-40 md:h-72'>
            <img src={`${backendStaticHomesUrl}/${home.imageCover}`} alt="house-coverImage" 
            className='shadow-xl md:rounded-t-lg object-cover w-full h-40 md:h-72'/>
          </div>
          
          <div className='flex flex-col gap-1 md:gap-4 mt-4 md:mt-8 border-b-2 pl-2 md:pl-0 items-start md:items-center'>
            
            <h1 className='text-xl md:text-3xl font-semibold text-center'>{home.name}</h1>

            <div className='flex md:hidden items-center'>
              <p className='text-gray-500 text-xs md:text-sm'>{home.address.split(',')[0]}</p>
              <MdLocationOn className='h-5 w-5'/>
            </div>

            <div className="flex gap-2 items-center justify-start text-xs mb-2 md:mb-0">
              <div className='p-1 bg-green-700 text-white font-semibold inline-flex justify-center items-center gap-1 rounded-lg w-12'>
              {home.ratingsAverage}
                <AiFillStar/>
              </div>

              <p className="text-gray-600">({home.ratingsQuantity} Ratings)</p>
            </div>

            <p className='hidden md:flex text-gray-400 text-xs md:text-base w-10/12 md:h-20 h-24'>{home.description}</p>
            <div className='hidden md:flex justify-between m-2 w-10/12'>
              <div className='flex gap-2 '>
                <BsHouseDoorFill className='h-5 w-5 text-secondary'/>
                <p className='text-gray-500'>{home.bedrooms} Rooms</p>
              </div>
              <div className='flex gap-2'>
                <FaBed className='h-5 w-5 text-secondary'/>
                <p className='text-gray-500'>{home.beds} Beds</p>
              </div>
            </div>
          </div>

          <div className='flex md:flex-row justify-end md:justify-between py-2 md:py-4 w-10/12 m-auto'>
            <div className='font-semibold text-xl md:text-green-700 text-secondary'>₹{home.price}</div>
            <div className='hidden md:flex items-center'>
              <MdLocationOn className='h-5 w-5'/>
              <p className='text-gray-500 text-xs md:text-sm'>{home.address}</p>
            </div>
          </div>

        </div>
      </Link>
    }    
    </div>
  )
}

export default Card;