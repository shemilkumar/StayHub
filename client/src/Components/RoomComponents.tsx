import React, { FormEvent, useEffect, useState } from 'react'

import DatePicker,{ setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import RoomDetails from './RoomDetails';
import apiRequest, { FetchChecked } from '../api/apiRequest';
import Alert from '../util/Alert';
import Input from "../Components/Elements/Input";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HomeModel } from '../Constants/modelTypes';
import { RAZORPAY_KEY_ID } from '../Constants/constant';
import Razorpay from "razorpay";

function RoomComponents({home} : {home: HomeModel}) {
  
  const navigate = useNavigate();
  const userFromStrore = useSelector((state : any) => state.user.value);

  setDefaultLocale('es');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [apiError, setApiError] = useState('');

  const apiErrorSetting = (message : string) => {
    setApiError(message);
    setTimeout(() => {
      setApiError('');
    }, 4000);
  }

  const getBookedDates = async() => {
    const response = await apiRequest.get(`/booking/${home._id}`) as any;

    if(response.pass){
      if(!response.fetchedData) return;

      // Need to convert string dates array to Date objects array
      const bookedDatesStr = response.fetchedData.data.allBookedDates;
      const bookedDatesDateObj = bookedDatesStr.map((dates: string) => new Date(dates));
      setBookedDates(bookedDatesDateObj);

    }else navigate(`/error/${response.message}`);
  }

  const bookHome = async(data: any) =>{
    const result = await apiRequest.post('/booking',data) as FetchChecked;

    if(result.pass){
      if(!result.fetchedData) return;
      // TODO Navigate to my booking
      navigate('/myBookings');
    }else apiErrorSetting(result.message!);
  }

  // const handleBook = async(e : FormEvent) =>{

  //   e.preventDefault();
   
  // };

  // const handlePayment = () =>{
  // }


  // ====================================================
  // Razorpay Implementation
  function loadScript(src : string) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
  };

  async function displayRazorpay() {

    if(!startDate || !endDate){
      apiErrorSetting('Please specify check-in & check-out dates');
      return;
    }

    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // const result = await axios.post("http://localhost:5000/payment/orders");
    const result = await apiRequest.post('/payment/order',{price : home.price}) as any;

    if (!result.pass) {
        alert(result.message);
        return;
    }

    if(!result.fetchedData) return;
    const { amount, id: order_id, currency } = result.fetchedData.data.order;
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    const options = {
      key_id: RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "StayHub",
      description: "Test Transaction",
      // image: { },
      order_id: order_id,
      handler: async function (response : any) {
        const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
        };

        const paymentResponse = await apiRequest.post('/payment/verify', data) as FetchChecked;
        if(paymentResponse.pass){
          if(!paymentResponse.fetchedData) return;
          const payment = paymentResponse.fetchedData.data.status;
          if(payment === 'success')
            bookHome({
              home,
              startDate,
              endDate,
            });
        }else apiErrorSetting(paymentResponse.message!);
      },
      prefill: {
          name: `${userFromStrore ? userFromStrore.name : 'John Doe'}`,
          email: `${userFromStrore ? userFromStrore.email : 'email@example.com'}`,
          contact: "9999999999",
      },
      notes: {
          address: `Test Address`,
      },
      theme: {
          color: "#CF0A0A",
      },
    };

    // @ts-ignore
    const paymentObject: any = new window.Razorpay(options);
    paymentObject.open();
  }

  // ==========================================================

  useEffect(() => {
    getBookedDates();
  }, []);


  // Date picker functions ///////////////////////
  const filterPassedTimeForEnd = (time : any) => {
    const selectedDate = new Date(time);

    if(!startDate?.getTime) return true;
    return startDate!.getTime() < selectedDate.getTime();
  };

  const filterPassedTimeForStart = (time : any) => {
    const selectedDate = new Date(time);

    if(!endDate?.getTime) return true;
    return endDate!.getTime() >= selectedDate.getTime();
  };

  const renderCustomDayContents = (day:any, date: Date) => {
    if (bookedDates.some((bookedDate) => bookedDate.getTime() === date.getTime())) {
      return <div className="bg-red-500 text-white rounded-lg">{day}</div>;
    }
    return day;
  };
  //////////////////////////////////////

  return (
    <>
      {apiError && <Alert message={apiError}/> }
      <div className='flex flex-col w-3/4'>
        {home && <RoomDetails home={home}/>}
      </div>

      <div className='h-full w-1/4 p-6 sticky top-24 shadow-2xl mb-12'>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className='font-semibold text-2xl'>${home.price}</span>
            <span className='stroke text-gray-500 text-base line-through'>${home.mrpPrice}</span>
            <span className='text-yellow-600 text-base font-semibold'>{home.discount}% off</span>
          </div>
          <p className='text-xs text-gray-500'>Inclusive of all taxes</p>
        </div>

        <div className='mt-4'>

          <DatePicker 
            placeholderText='Check In'
            // showTimeSelect
            dateFormat="MMMM d, yyyy"
            closeOnScroll={true}
            selected={startDate} 
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            excludeDates={bookedDates}
            renderDayContents={renderCustomDayContents}
            // highlightDates={bookedDates}
            filterTime={filterPassedTimeForStart}
            onChange={date => setStartDate(date!)}
            className='w-full p-4 text-sm text-gray-600 tracking-wide bg-gray-200 mt-2 h-12 rounded-sm focus:border-b-secondary border-2 outline-none'
          />

          <DatePicker 
            placeholderText='Check Out'
            // showTimeSelect
            dateFormat="MMMM d, yyyy"
            closeOnScroll={true}
            selected={endDate} 
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            excludeDates={bookedDates}
            renderDayContents={renderCustomDayContents}
            filterTime={filterPassedTimeForEnd}
            onChange={date => setEndDate(date!)}
            className='w-full p-4 text-sm text-gray-600 tracking-wide bg-gray-200 mb-2 mt-2 h-12 rounded-sm focus:border-b-secondary border-2 outline-none'
          />

          <p className='my-2 text-xs text-red-500'>Red color dates are not available</p>

          <DatePicker
            selected={startDate}
            onChange={(dates) => {
              const [start, end] = dates;
              setStartDate(start);
              setEndDate(end);
            }}
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            // highlightDates={bookedDates}
            disabled
            excludeDates={bookedDates}
            renderDayContents={renderCustomDayContents}
            selectsRange
            inline
          />

        </div>

        <div className='mt-4'>
          <p className='font-semibold text-lg text-secondary mb-4'>Enter your Email</p>
          <Input label='Email' id='email' type='text'  value={userFromStrore ? userFromStrore.email : ''}/>
          {/* <Input label='Phone' id='phone' type='text' /> */}
        </div>

        {/* <button className='mt-2 bg-secondary w-full py-3 rounded-md text-white text-base font-semibold' onClick={handleBook}>Continue to Book</button> */}
        <button className='mt-2 bg-secondary w-full py-3 rounded-md text-white text-base font-semibold' onClick={displayRazorpay}>Continue to Book</button>

      </div>
    </>
  )
}

export default RoomComponents;