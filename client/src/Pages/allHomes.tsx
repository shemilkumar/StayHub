import React, { useEffect, useState } from 'react'
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import apiRequest from '../api/apiRequest';
import { HomeModel } from "../Constants/modelTypes";

function allHomes() {

  const cacheKey = 'allHomes';
  // 3 sec
  const CACHE_MINUTE = 0.05;

  const [homes, setHomes] = useState<HomeModel[]>([]);

  const cacheDelete = (minute: number): void => {
    setTimeout(() => {
      localStorage.removeItem(cacheKey);
    }, 1000 * 60 * minute);
  }

  useEffect(() => {
    const getHomes = async() =>{

      let data: HomeModel[] = [];
      const cachedData = localStorage.getItem(cacheKey);
      // console.log(JSON.parse(cachedData));
      if(cachedData) {
        data = JSON.parse(cachedData) as HomeModel[];

        // Remove cache after specific mins
        cacheDelete(CACHE_MINUTE);
      }

      if(data.length > 0){
        console.log("Data from localStorage");
        setHomes(data);
      }else{
        // const response = await apiRequest('GET','/homes');
        const response = await apiRequest.get(`/homes`);
        console.log("Data from API",response);

        if(response){
          setHomes(response.data);
  
          localStorage.setItem(cacheKey,JSON.stringify(response.data));
          // Remove cache after specific mins
          cacheDelete(CACHE_MINUTE);
        }
      }
    };

    if(homes.length <= 0) getHomes();
  }, []);
  
  return (
    <>
      <Navbar/>
        <div className='min-h-screen flex'>
          <div className='m-auto grid grid-cols-3 gap-4'>
            {homes.length > 0 ? homes.map((home,i) => <Card home={home} key={i}/>) : ''}
          </div>
        </div>
      <Footer/>
    </>
  )
}

export default allHomes;