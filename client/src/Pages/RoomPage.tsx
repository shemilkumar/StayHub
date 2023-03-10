import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useApi from '../api/useApi';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import RoomComponents from '../Components/RoomComponents';
import Spinner from '../Components/Spinner';
import { HomeModel } from '../Constants/modelTypes';

function RoomPage() {

  const naviagate =useNavigate()
  const [home, setHome] = useState<HomeModel>();
  const [homeId, setHomeId] = useState();
  const [apiError,setApiError] = useState<string>();

  const {id} = useParams();
  const {data,error} = useApi('GET',`/homes/${id}`);
  
  useEffect(() => {

    if(data){
      setHome(data.data);
    }

    if(error){
      setApiError(error);
      naviagate(`/error/${error}`);
    }

  }, [data,error]);

  return (
    <>
      <Navbar/>

      <div className='mt-24 max-w-same flex m-auto justify-between gap-4 relative'>
        {home ? <RoomComponents home={home}/> : <Spinner/>}
      </div>

      <Footer/>
    </>
  )
}

export default RoomPage;