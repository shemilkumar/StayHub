import React, { useState } from 'react'
import ImageCarousel from './ImageCarousel';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setDefaultLocale } from  "react-datepicker";
// import es from 'date-fns/locale/es';

import Input from "../Components/Elements/Input";
import RoomDetails from './RoomDetails';

function RoomComponents() {
  setDefaultLocale('es');

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);


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

  return (
    <>
      <div className='flex flex-col w-3/4'>
        <RoomDetails/>
      </div>

      <div className='h-full border-2 border-gray-200 w-1/4 p-6 sticky top-24'>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className='font-semibold text-2xl'>$1343</span>
            <span className='stroke text-gray-500 text-base line-through'>$4258</span>
            <span className='text-yellow-600 text-base font-semibold'>68% off</span>
          </div>
          <p className='text-xs text-gray-500'>Inclusive of all taxes</p>
        </div>

        <div className='mt-8'>

          <DatePicker
            selected={startDate}
            onChange={(dates) => {
              const [start, end] = dates;
              setStartDate(start);
              setEndDate(end);
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />

          <DatePicker 
            placeholderText='Check In'
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mmaa"
            closeOnScroll={true}
            selected={startDate} 
            selectsStart
            startDate={startDate}
            endDate={endDate}
            filterTime={filterPassedTimeForStart}
            onChange={date => setStartDate(date!)}
            className='w-full p-4 text-sm text-gray-600 tracking-wide bg-gray-200 mt-2 h-12 rounded-sm focus:border-b-secondary border-2 outline-none'
          />

          <DatePicker 
            placeholderText='Check Out'
            showTimeSelect
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

        </div>

        <div className='mt-4'>
          <p className='font-semibold text-lg text-secondary mb-4'>Enter your details</p>
          <Input label='Email' id='email' type='text' value={`shemil@example.com`}/>
          <Input label='Phone' id='phone' type='text' />
        </div>

        <button className='mt-2 bg-secondary w-full py-3 rounded-md text-white text-base font-semibold'>Continue to Book</button>

      </div>
    </>
  )
}

export default RoomComponents;