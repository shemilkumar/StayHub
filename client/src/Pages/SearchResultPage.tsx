import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CardList from '../Components/CardList';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import Spinner from '../Components/Spinner';

function SearchResultPage() {

  const searchResultFromStore = useSelector((state : any) => state.searchResult.results);
  const [homes, setHomes] = useState<[] | null>(null);

  useEffect(() => {
    searchResultFromStore.length > 0 && setHomes(searchResultFromStore);
    // console.log(searchResultFromStore);
  }, []);

  return (
    <>
      <Navbar/>
      <div className='min-h-screen flex'>
        {
          homes ?
            <div className='m-auto flex flex-col gap-4 md:gap-12 my-24 md:my-32'>
              <h1 className='px-2 md:px-0 text-xl md:text-2xl font-semibold text-black'>Got {homes.length} nearby homes</h1>
              {homes && homes.length > 0 ? homes.map((home,i) => <CardList home={home} key={i}/>) : <Spinner/> }
            </div>
          :
          <div className='m-auto'>
            <h1 className=' text-4xl text-secondary'>Not able to find any result</h1>
            <p className='text-gray-500'>try again with diffrent places...</p>
          </div>
        }
      </div>
      <Footer/>
    </>
  )
}

export default SearchResultPage;