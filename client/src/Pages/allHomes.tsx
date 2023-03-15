import React, { useEffect, useState } from 'react'
import Card from '../Components/Card';
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
  const homesFromStore = useSelector((state: any )=> state.homes.allHomes);

  const [homes, setHomes] = useState<HomeModel[]>([]);
  const [apiError,setApiError] = useState<string | null>(null);
  const [sort,setSort] = useState('');

  const fetchAllHomes = async(sortParam = '') =>{

    let result;

    if(sortParam){
      let sortParameter = '';

      if(sortParam === 'lowToHigh') sortParameter = 'price';
      if(sortParam === 'highToLow') sortParameter = '-price';
      if(sortParam === 'rating') sortParameter = '-ratingsAverage';
      // if(sortParam === 'discount') sortParameter = '-discount';
      
      result = await apiRequest.get(`/homes?sort=${sortParameter}`) as FetchChecked;

    }else{
      result = await apiRequest.get('/homes') as FetchChecked;
    }

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
          <div className='m-auto'>

            <div className='flex justify-end mt-32'>
              <select name="sort" id="sort" className='p-3 border-2 bg-blue-100'
              onChange={(e) => {
                setSort(e.target.value);
                fetchAllHomes(e.target.value);
                console.log(sort);
              }}>
                <option value="popularity" className='p-3'>Popularity</option>
                <option value="rating" className='p-3'>Rating</option>
                {/* <option value="discount" className='p-3'>Discount</option> */}
                <option value="lowToHigh" className='p-3'>Price -- Low to High</option>
                <option value="highToLow" className='p-3'>Price -- High to Low</option>
              </select>
            </div>

            <div className='grid grid-cols-3 gap-12 mt-12 mb-32'>
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