import React, { useEffect, useState } from 'react'
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import apiRequest from '../api/apiRequest';

function allHomes() {

  const [homes, setHomes] = useState<object[]>([]);

  useEffect(() => {
    const getHomes = async() =>{
      const response = await apiRequest('GET','/homes');
      setHomes(response.data);
    }

    getHomes();
  }, []);
  
  return (
    <>
      <Navbar/>
        <div className='min-h-screen flex'>
          <div className='m-auto grid grid-cols-3 gap-4'>
            {homes.length > 0 ? homes.map((home,i) => <Card key={i} />) : ''}
          </div>
        </div>
      <Footer/>
    </>
  )
}

export default allHomes;