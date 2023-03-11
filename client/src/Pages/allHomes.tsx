import React, { useEffect, useState } from 'react'
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import apiRequest, { FetchChecked } from '../api/apiRequest';
import { Data, HomeModel } from "../Constants/modelTypes";
import useApi from '../api/useApi';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { setAllHomes } from '../Redux/Slicers/homeSlice';

function allHomes() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const homesFromStore = useSelector((state: any )=> state.homes.allHomes);

  const [homes, setHomes] = useState<HomeModel[]>([]);
  const [apiError,setApiError] = useState<string | null>(null);

  const fetchAllHomes = async() =>{
    const result = await apiRequest.get('/homes') as FetchChecked;

    if(result.pass){
      if(!result.fetchedData) return;
      // console.log(result.fetchedData.data.data);
      setHomes(result.fetchedData.data.data);
      dispatch(setAllHomes(result.fetchedData.data.data));

    }else navigate(`/error/${result.message}`);
  }

  useEffect(() => {
    if(homesFromStore.length === 0) fetchAllHomes();
    else setHomes(homesFromStore);
  }, []);
  
  return (
    <>
      <Navbar/>

        <div className='min-h-screen flex'>
          { homes.length <= 0 ?
          <Spinner/> :
          <div className='m-auto grid grid-cols-3 gap-12'>
            {homes.length > 0 ? homes.map((home,i) => <Card home={home} key={i}/>) : ''}
          </div>
          }
        </div>
      <Footer/>
    </>
  )
}

export default allHomes;