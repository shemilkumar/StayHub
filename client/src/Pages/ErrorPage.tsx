import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ErrorView from '../Components/ErrorView';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import logout from '../util/logout';

function ErrorPage() {

  const [errorMessage, setErrorMessage] = useState('')

  const params = useParams();

  useEffect(() => {
    // console.log(params);
    if(params.message) setErrorMessage(params.message);
    if(params.message?.includes('Please login again')) logout();

  }, [])
  


  return (
    <>
      <Navbar/>
      <ErrorView error={errorMessage}/>
      <Footer/>
    </>
  )
}

export default ErrorPage;