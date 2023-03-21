import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import apiRequest, { FetchChecked } from '../api/apiRequest';
import BookedCard from '../Components/BookedCard';
import Button from '../Components/Elements/Button';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import Spinner from '../Components/Spinner';

function MyBookingsPage() {

  const navigate = useNavigate();
  const [myBookings, setMyBookings] = useState<null | any[]>(null);

  const getMyBookings = async() => {
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
    <>
      <Navbar/>
      {
        myBookings ? 
        <div className='min-h-screen flex'>
          {myBookings.length === 0 ? 
            <div className='m-auto flex flex-col transition-all duration-500 ease-in'>
              <h1 className='text-xl md:text-3xl text-red-500 font-semibold'>No bookings yet!</h1>
              <p className='text-gray-600 mb-4'>What are you waiting for? book your home now !</p>
              <Link to={`/homes`}><Button text='Explore Homes'/></Link>
            </div>
          :
            <div className='m-auto mt-32 mb-16'>
              <h1  className='text-center text-3xl md:text-4xl font-semibold font-sans mb-12'>
                My<span className='text-secondary'> Bookings</span>
              </h1>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0'>
                {
                  myBookings.map((booking : any,i) => {
                    return(
                      <BookedCard key={i} home={booking.home} booking={booking}/>
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
      
      <Footer/>
    </>
  )
}

export default MyBookingsPage;