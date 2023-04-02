import React, { useEffect, useState,lazy } from 'react'
// import Card from '../Components/Card';
const Card = lazy(() => import('../Components/Card'));

import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import apiRequest, { FetchChecked } from '../api/apiRequest';
import { HomeModel } from "../Constants/modelTypes";
import { useNavigate } from 'react-router-dom';
import Spinner from '../Components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { setAllHomes } from '../Redux/Slicers/homeSlice';

function allHomes() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const homesFromStore = useSelector((state: any )=> state.homes.allHomes) as HomeModel[];

  const [homes, setHomes] = useState<HomeModel[]>([]);
  const [sort,setSort] = useState<string>('');

  const fetchAllHomes = async(sortParam: string = ''):Promise<void> =>{

    let result;

    if(sortParam){
      let sortParameter = '';

      if(sortParam === 'lowToHigh') sortParameter = 'price';
      if(sortParam === 'highToLow') sortParameter = '-price';
      if(sortParam === 'rating') sortParameter = '-ratingsAverage';
      // if(sortParam === 'discount') sortParameter = '-discount';
      
      result = await apiRequest.get(`/homes?sort=${sortParameter}`) as FetchChecked;

    }else result = await apiRequest.get('/homes') as FetchChecked;

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
      <Navbar active='houses'/>

        <div className='min-h-screen flex mx-3 md:mx-4'>
          { homes.length <= 0 ?
          <Spinner/> :
          <div className='m-auto'>

            <div className='flex justify-end mt-20 md:mt-32'>
              <select name="sort" id="sort" className='p-1 md:p-3 border-2 bg-blue-100'
              onChange={(e) => {
                setSort(e.target.value);
                fetchAllHomes(e.target.value);
              }}>
                <option value="popularity" className='p-3'>Popularity</option>
                <option value="rating" className='p-3'>Rating</option>
                {/* <option value="discount" className='p-3'>Discount</option> */}
                <option value="lowToHigh" className='p-3'>Price -- Low to High</option>
                <option value="highToLow" className='p-3'>Price -- High to Low</option>
              </select>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 mt-8 md:mt-12 mb-8 md:mb-32'>
              {homes.length > 0 ? homes.map((home,i) => <Card home={home} key={i}/>) : ''}
            </div>

          </div>
          }
        </div>
      <Footer/>
    </>
  )
}

export default allHomes;