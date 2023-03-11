import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import apiRequest, { FetchChecked } from '../api/apiRequest';
import Card from '../Components/Card';
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
              <h1 className='text-3xl text-red-500 font-semibold'>No bookings yet!</h1>
              <p className='text-gray-600 mb-4'>What are you waiting for? book your home now !</p>
              <Link to={`/homes`}><Button text='Explore Homes'/></Link>
            </div>
          :
            <div className='m-auto'>
              <h1  className='text-center text-secondary text-4xl font-semibold mb-20'>My Bookings</h1>
              <div className='grid grid-cols-3 gap-8'>
                {
                  myBookings.map((booking : any,i) => {
                    return(
                      <Card key={i} home={booking.home}/>
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