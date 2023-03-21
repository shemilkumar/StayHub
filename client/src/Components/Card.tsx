import React from 'react';
import {MdLocationOn} from "react-icons/md";
import {BsHouseDoorFill} from "react-icons/bs";
import {FaBed} from "react-icons/fa";
import { Link } from 'react-router-dom';
import { HomeModel } from "../Constants/modelTypes";
import { backendStaticHomesUrl } from '../Constants/constant';

function Card( {home} : {home:HomeModel}) {

  // console.log(home.imageCover);

  return (
    <div>
    { home &&
      <Link to={home?._id ? `/room/${home._id}` : 'room/fake_id'}>
        <div className="w-80 md:w-96 shadow-2xl rounded-xl transition-all ease-in-out duration-500 hover:scale-105">
          <div className='h-72'>
            <img src={`${backendStaticHomesUrl}/${home.imageCover}`} alt="house-coverImage" 
            className='shadow-xl rounded-t-lg object-cover h-72'/>
          </div>
          <div className='flex flex-col gap-4 mt-8 border-b-2 items-center'>
            <h1 className='text-2xl md:text-3xl font-semibold text-center'>{home.name}</h1>
            <p className='text-gray-400 text-sm md:text-base w-10/12 md:h-20 h-16'>{home.description}</p>
            <div className='flex justify-between m-2 w-10/12'>
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

          <div className='flex justify-between py-4 w-10/12 m-auto'>
            <div className='font-semibold text-xl text-green-700'>${home.price}</div>
            <div className='flex items-center'>
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