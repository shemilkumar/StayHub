import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import apiRequest, { FetchChecked } from '../api/apiRequest';
import { HomeModel, Stats } from '../Constants/modelTypes';
import { setAllBestSellers } from '../Redux/Slicers/bestSellersSlice';
import Card from './Card';

function BestSellers() {
  
  const dispatch = useDispatch();
  const bestSellersFromStore = useSelector((state : any) => state.bestSellers.bestSellers);
  const [bestSellers, setBestSellers] = useState<[] | HomeModel[]>([]);

  const getBestSellers = async() => {
    const result = await apiRequest.get('/booking/bookingStats') as FetchChecked;

    if(result.pass){
      if(!result.fetchedData) return;

      // console.log(result.fetchedData.data);
      const stats = result.fetchedData.data.stats! as Stats[];
      const bestSellerHomes = result.fetchedData.data.bestSellers! as HomeModel[];

      const bestSellersData: HomeModel[] = [];

      stats.forEach((data : Stats) => {
        bestSellerHomes.forEach((home: HomeModel) => {
          if(data._id === home._id) bestSellersData.push(home);
        });
      });

      setBestSellers(bestSellersData);
      dispatch(setAllBestSellers(bestSellersData));

    }else alert(result.message);
  }

  useEffect(() => {
    if(bestSellersFromStore.length === 0) getBestSellers();
    else setBestSellers(bestSellersFromStore);
  }, [])
  

  return (
    <div className='min-h-screen mt-16 md:mt-0 flex flex-col gap-12 justify-center items-center'>
      <h1 className='text-4xl md:text-6xl font-semibold font-sans'>Best
       <span className='text-secondary'> Sellers</span>
       </h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 '>
        {
          bestSellers.map((bestSeller, i) => {
            return(
              <Card home={bestSeller} key={i}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default BestSellers;