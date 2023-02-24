import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import apiRequest from '../api/apiRequest';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import RoomComponents from '../Components/RoomComponents';
import Spinner from '../Components/Spinner';
import { HomeModel } from '../Constants/modelTypes';

function RoomPage() {

  const [home, setHome] = useState<HomeModel>();

  const {id} = useParams();
  console.log(id);
  
  
  useEffect(() => {
    const getHome = async() =>{
      if(id){
        const response = await apiRequest('GET',`/homes/${id}`);
        setHome(response?.data);
        // console.log("yes===>",response.data);
      }else console.log('id is not there');
    }
    
    if(!home) getHome();
  }, [home]);

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