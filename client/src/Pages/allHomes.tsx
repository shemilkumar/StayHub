import React, { useEffect, useState } from 'react'
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import apiRequest from '../api/apiRequest';
import { Data, HomeModel } from "../Constants/modelTypes";
import useApi from '../api/useApi';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Components/Spinner';

function allHomes() {

  const navigate = useNavigate();
  const [homes, setHomes] = useState<HomeModel[]>([]);
  const [apiError,setApiError] = useState<string | null>(null);

  const endpoint = '/homes';
  const {data ,error} = useApi('GET',endpoint);
  // console.log("Data from API",data);

  // 3 sec
  const CACHE_MINUTE = 1;
  const cacheDelete = (minute: number): void => {
    setTimeout(() => {
      localStorage.removeItem(endpoint);
    }, 1000 * 60 * minute);
  }

  useEffect(() => {

      let dataFromCache: HomeModel[] = [];
      const cachedData = localStorage.getItem(endpoint);
      // console.log(JSON.parse(cachedData));
      if(cachedData) {
        dataFromCache = JSON.parse(cachedData).data;

        // Remove cache after specific mins
        cacheDelete(CACHE_MINUTE);
      }

      if(dataFromCache.length > 0){
        // console.log("Data from localStorage");
        setHomes(dataFromCache);
      }else{
        if(data?.data) setHomes(data.data);
        cacheDelete(CACHE_MINUTE);
    };

    setApiError(error);
    if(error) navigate(`/error/${error}`)

  }, [data,error]);
  
  return (
    <>
      <Navbar/>

        <div className='min-h-screen flex'>
          { homes.length <= 0 ?
          <Spinner/> :
          <div className='m-auto grid grid-cols-3 gap-4'>
            {homes.length > 0 ? homes.map((home,i) => <Card home={home} key={i}/>) : ''}
          </div>
          }
        </div>
      <Footer/>
    </>
  )
}

export default allHomes;