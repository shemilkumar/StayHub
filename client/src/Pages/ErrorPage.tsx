import React from 'react'
import ErrorView from '../Components/ErrorView';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

function ErrorPage() {
  return (
    <>
      <Navbar/>
      <ErrorView/>
      <Footer/>
    </>
  )
}

export default ErrorPage;