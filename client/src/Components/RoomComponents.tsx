import React, { FormEvent, useEffect, useState } from 'react'
import ImageCarousel from './ImageCarousel';
import moment from "moment";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setDefaultLocale } from  "react-datepicker";
// import es from 'date-fns/locale/es';

import Input from "../Components/Elements/Input";
import RoomDetails from './RoomDetails';
import { HomeModel } from '../Constants/modelTypes';
import apiRequest from '../api/apiRequest';
import { useParams } from 'react-router-dom';

function RoomComponents({home} : {home: HomeModel}) {
  setDefaultLocale('es');

  const {id} = useParams();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  // let bookedDates: Date[] = [];


  // useEffect(() => {
   
  // }, []);

  const bookHome = async(data : any) =>{
    console.log("frontend",data);
    const result = await apiRequest.post('/booking',data) as any;

    if(result.pass){
      if(!result.fetchedData) return;
      console.log(result.fetchedData);
    }else console.log(result.message);
  }
  


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

  function getDates(checkInDate: Date, checkOutDate: Date) {
    let dateArray = [];
    let startingDate = moment(checkInDate);
    const stopDate = moment(checkOutDate);
    while (startingDate <= stopDate) {
        dateArray.push(new Date(moment(startingDate).format()));
        startingDate = moment(startingDate).add(1, 'days');
    }
    return dateArray;
  } 

  const renderCustomDayContents = (day:any, date: Date) => {
    if (bookedDates.some((bookedDate) => bookedDate.getTime() === date.getTime())) {
      return <div className="bg-red-500 text-white rounded-lg">{day}</div>;
    }
    return day;
  };

  const hanldeBook = (e : FormEvent) =>{
    e.preventDefault();
    // console.log(startDate,endDate);
    if(!startDate || !endDate) return;

    setBookedDates(getDates(startDate,endDate));
    // console.log(bookedDates);

    const bookingDetails = {
      tour: id,
      price: home.price,
      startDate,
      endDate,
    }

    bookHome(bookingDetails);
  };

  return (
    <>
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
            dateFormat="MMMM d, yyyy h:mmaa"
            closeOnScroll={true}
            selected={startDate} 
            selectsStart
            startDate={startDate}
            endDate={endDate}
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
            dateFormat="MMMM d, yyyy h:mmaa"
            closeOnScroll={true}
            selected={endDate} 
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
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
            // highlightDates={bookedDates}
            disabled
            excludeDates={bookedDates}
            renderDayContents={renderCustomDayContents}
            selectsRange
            inline
          />

        </div>

        <div className='mt-4'>
          <p className='font-semibold text-lg text-secondary mb-4'>Enter your details</p>
          <Input label='Email' id='email' type='text' value={`shemil@example.com`}/>
          <Input label='Phone' id='phone' type='text' />
        </div>

        <button className='mt-2 bg-secondary w-full py-3 rounded-md text-white text-base font-semibold' onClick={hanldeBook}>Continue to Book</button>

      </div>
    </>
  )
}

export default RoomComponents;