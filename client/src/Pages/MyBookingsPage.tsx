import React,{lazy, Suspense} from 'react'
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import Spinner from '../Components/Spinner';
// import MyBookings from '../Components/MyBookings';
const MyBookings = lazy(() => import('../Components/MyBookings'));

function MyBookingsPage() {

  return (
    <>
      <Navbar active='booking'/>

      <Suspense fallback={<Spinner/>}>
        <MyBookings/>
      </Suspense>
      
      <Footer/>
    </>
  )
}

export default MyBookingsPage;