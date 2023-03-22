import React from 'react';
import {MdLocationOn} from "react-icons/md";
import {BsHouseDoorFill} from "react-icons/bs";
import {FaBed} from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { HomeModel } from "../Constants/modelTypes";
import { backendStaticHomesUrl } from '../Constants/constant';
import { AiFillStar } from 'react-icons/ai';
import Button from './Elements/Button';
import apiRequest, { FetchChecked } from '../api/apiRequest';

function BookedCard( {home, booking} : {home:HomeModel, booking: any}) {

  const navigate = useNavigate();

  const cancelBooking = async() => {
    const response = await apiRequest.delete(`/booking/${booking._id}`) as FetchChecked;

    if(response.pass){
      if(response.deleted) window.location.reload();
    }else{
      navigate(`/error/${response.message}`);
    }
  }

  return (
    <div>
    { home &&
        <div className="w-72 md:w-96 shadow-2xl rounded-xl transition-all ease-in-out duration-500 hover:scale-105">          
          <Link to={home?._id ? `/home/${home._id}` : 'room/fake_id'}>
            <div className='h-40 md:h-72'>
              <img src={`${backendStaticHomesUrl}/${home.imageCover}`} alt="house-coverImage" 
              className='shadow-xl rounded-t-lg object-cover h-40 md:h-72 w-full'/>
            </div>
            <div className='flex flex-col gap-1 md:gap-2 mt-4 md:mt-8 border-b-2 p-3'>

              <div className='flex justify-between items-center'>
                <h1 className='text-xl md:text-3xl font-semibold'>{home.name}</h1>
                <h1 className='text-3xl text-secondary font-semibold'>{home.price}$</h1>
              </div>

              <div className='flex text-gray-500'>
                <MdLocationOn className='h-5 w-5 '/>
                <p className='text-gray-500 text-sm'>{home.address}</p>
              </div>

              <div className="flex gap-2 items-center text-xs">
                <div className='p-1 bg-green-700 text-white font-semibold inline-flex justify-center items-center gap-1 rounded-lg w-12'>
                {home.ratingsAverage}
                  <AiFillStar/>
                </div>

                <p className="text-gray-600">({home.ratingsQuantity} Ratings)</p>
              </div>

              <div className='flex gap-4 mt-2 w-10/12 text-xs'>
                <div className='flex gap-2 rounded-full bg-red-100 p-2'>
                  <BsHouseDoorFill className='h-5 w-5 text-secondary'/>
                  <p className='text-gray-500'>{home.bedrooms} Rooms</p>
                </div>
                <div className='flex gap-2 rounded-full bg-red-100 p-2'>
                  <FaBed className='h-5 w-5 text-secondary'/>
                  <p className='text-gray-500'>{home.beds} Beds</p>
                </div>
              </div>
            </div>

          </Link>
          <div className='flex justify-between items-center px-3 py-4  m-auto'>
            
            <p className='text-green-800 font-semibold text-md md:text-lg'>{
            `${new Date(booking.startDate).toLocaleDateString('en-US',{
              month: 'short', day:'numeric'
            })} - 
            ${new Date(booking.endDate).toLocaleDateString('en-US',{
              month: 'short', day:'numeric'
            })}`
            }
            </p>
            
            <div className='flex items-center rounded-full shadow-lg'
            onClick={cancelBooking}>
              <Button text='Cancel Booking' invert={true} round={true}/>
            </div>
          </div>
        </div>
    }    
    </div>
  )
}

export default BookedCard;