import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
// import useApi from '../api/useApi';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import RoomComponents from '../Components/RoomComponents';
import Spinner from '../Components/Spinner';
import { HomeModel } from '../Constants/modelTypes';
import apiRequest, { FetchChecked } from '../api/apiRequest';

function RoomPage() {

  const navigate =useNavigate()
  const {id} = useParams();

  const [home, setHome] = useState<HomeModel>();
  const [homeFetched, setHomeFetched] = useState<boolean>(false);
  // const {data,error} = useApi('GET',`/homes/${id}`);

  // useEffect(() => {
  //   if(data) setHome(data.data);
  //   if(error) navigate(`/error/${error}`);
  // }, [data,error]);

  const getHome = async() =>{
    const response = await apiRequest.get(`/homes/${id}`) as FetchChecked;

    if(response.pass){
      setHome(response.fetchedData?.data.data);
    }else navigate(`/error/${response.message}`);
  }

  useEffect(() => {
    if(!homeFetched){
      getHome();
      console.log(homeFetched);
      setHomeFetched(true);
    }
  }, [homeFetched]);
  

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