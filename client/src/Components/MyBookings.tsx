import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import apiRequest, { FetchChecked } from '../api/apiRequest';
import BookedCard from '../Components/BookedCard';
import Button from '../Components/Elements/Button';
import Spinner from '../Components/Spinner';
import { BookingModel } from '../Constants/modelTypes';

function MyBookings() {

  const navigate = useNavigate();
  const [myBookings, setMyBookings] = useState<null | BookingModel[]>(null);

  const getMyBookings = async(): Promise<void> => {
    const response = await apiRequest.get('/booking/myBookings') as FetchChecked;

    if(response.pass){
      if(!response.fetchedData) return;
      // console.log(response.fetchedData.data.data.data);
      setMyBookings(response.fetchedData.data.data.data);
    }else navigate(`/error/${response.message}`);
  }

  useEffect(() => {
    getMyBookings();
  }, [])

  return (
    <div>
      {
        myBookings ? 
        <div className='min-h-screen flex justify-center items-center'>
          {myBookings.length === 0 ? 
            <div className='m-auto flex flex-col transition-all duration-500 ease-in mx-4 md:mx-0'>
              <h1 className='text-xl md:text-3xl text-red-500 font-semibold'>No upcoming bookings!</h1>
              <p className='text-gray-600 mb-4'>What are you waiting for? book your home now</p>
              <Link to={`/homes`}><Button text='Explore Homes'/></Link>
            </div>
          :
            <div className='m-auto mt-24 md:mt-32 mb-16'>
              <h1  className='text-center text-2xl md:text-4xl font-semibold font-sans mb-6 md:mb-12'>
                My<span className='text-secondary'> Bookings</span>
              </h1>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0'>
                {
                  myBookings.map((booking : BookingModel,i) => {
                    return(
                      <BookedCard key={i} booking={booking}/>
                    );
                  })
                }
              </div>
            </div>
          }
        </div>
        :
        <Spinner/>
      }
    </div>
  )
}

export default MyBookings;