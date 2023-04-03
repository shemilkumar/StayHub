import React, { useEffect, useState,lazy,Suspense } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import ErrorView from '../Components/ErrorView';
const ErrorView = lazy(() => import('../Components/ErrorView'));

import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { deleteUserData } from '../Redux/Slicers/userSlice';
import logout from '../util/logout';
import Spinner from '../Components/Spinner';

function ErrorPage() {

  const dispatch = useDispatch();
  const params = useParams();
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if(params.message) setErrorMessage(params.message);
    if(params.message?.includes('Please login again')){
      dispatch(deleteUserData());
      logout();
    }
  }, []);

  return (
    <>
      <Navbar/>
      
      <Suspense fallback={<Spinner/>}>
        <ErrorView error={errorMessage}/>
      </Suspense>

      <Footer/>
    </>
  )
}

export default ErrorPage;