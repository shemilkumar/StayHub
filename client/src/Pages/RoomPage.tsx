import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useApi from '../api/useApi';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import RoomComponents from '../Components/RoomComponents';
import Spinner from '../Components/Spinner';
import { HomeModel } from '../Constants/modelTypes';

function RoomPage() {

  const navigate =useNavigate()
  const {id} = useParams();

  const [home, setHome] = useState<HomeModel>();
  const {data,error} = useApi('GET',`/homes/${id}`);
  
  useEffect(() => {
    if(data) setHome(data.data);
    if(error) navigate(`/error/${error}`);
  }, [data,error]);

  return (
    <>
      <Navbar/>
      <div className='mt-16 md:mt-24 md:max-w-same flex m-auto justify-between gap-4 relative'>
        {home ? <RoomComponents home={home}/> : <Spinner/>}
      </div>
      <Footer/>
    </>
  )
}

export default RoomPage;