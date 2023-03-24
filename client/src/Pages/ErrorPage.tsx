import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ErrorView from '../Components/ErrorView';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { deleteUserData } from '../Redux/Slicers/userSlice';
import logout from '../util/logout';

function ErrorPage() {

  const dispatch = useDispatch();
  const params = useParams();
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if(params.message) setErrorMessage(params.message);
    if(params.message?.includes('Please login again')){
      logout();
      dispatch(deleteUserData());
    }
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