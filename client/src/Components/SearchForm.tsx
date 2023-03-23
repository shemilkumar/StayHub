import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import apiRequest, { FetchChecked } from '../api/apiRequest';
import { setAllSearchResult } from '../Redux/Slicers/searchResultSlice';
import Alert from '../util/Alert';

import { BiSearch } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import axios from 'axios';

interface DestinationData{
  center: number[],
  place_name: string,
  text: string,
}

function SearchForm() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userDestination, setUserDestination] = useState<string>('');
  const [userDestinationSuggestions, setUserDestinationSuggestions]=useState<DestinationData[] | null>(null);
  const [userDestinationLatLng, setUserDestinationLatLng] = useState<number[]>([]);
  const [error,setError] = useState('');

  useEffect(() => {
  }, [userDestinationSuggestions]);
  
 
  // const [startDate, setStartDate] = useState<string>('');
  // const [endDate, setEndDate] = useState<string>('');
  const [guests, setGuests] = useState<string>('');

  const apiErrorSetting = (message : string):void => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 4000);
  }


  function getDatesInRange(dateStart : string, dateEnd : string): Date[] {
    const dates = [];
    // console.log(dateStart,dateEnd);
    let currentDate = new Date(dateStart);
    let endDate = new Date(dateEnd);
  
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return dates;
  }
  

  const handleSearch = async(e : FormEvent): Promise<void> => {
    e.preventDefault();

    if(userDestinationLatLng.length === 0){
      apiErrorSetting('Select where you want to go');
      return;
    }

    if(!guests){
      apiErrorSetting('Fill number of guests');
      return;
    }

    const searchData = {
      location : userDestinationLatLng,
      guests: parseInt(guests)
      // searchDates: getDatesInRange(startDate,endDate),
    }

    const nearByHomes = await apiRequest.post('/homes/nearestHomes',searchData) as FetchChecked;

    if(nearByHomes.pass){
      if(!nearByHomes.fetchedData) return;

      // console.log(nearByHomes.fetchedData.data);
      dispatch(setAllSearchResult(nearByHomes.fetchedData.data.nearGuestHomes!));
      navigate('/searchResult');
      //  Here I have to pass data to <SearchResultPage/>

    }else apiErrorSetting(nearByHomes.message!);
  };

  const handleChangePlace = async(e : ChangeEvent<HTMLInputElement>): Promise<void> =>{

    setUserDestination(e.target.value);
    console.log(e.target.value);
    if(e.target.value === ''){
      setUserDestinationSuggestions(null);
      console.log(userDestinationSuggestions);
    }

    const config = { 
      headers: {
      'Content-Type': 'application/json',
      }
    }

    const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic2hlbWlsIiwiYSI6ImNsZTVhdjBtejBiOXMzcHFkeDdzenVubnQifQ.ELopMEw5SnKU0QOU85_Bdg';

    const mapBoxResult = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${userDestination}.json?country=IN&access_token=${MAPBOX_ACCESS_TOKEN}`, config);

    // console.log(mapBoxResult.data.features);
    setUserDestinationSuggestions(mapBoxResult.data.features);
    // console.log(mapBoxResult.data.features);

  }

  return (
    <div>
      {error && <Alert message={error}/>}
      <div className="flex flex-col w-full md:mt-40 mt-20">

        <h1 className='md:text-5xl text-3xl font-semibold font-sans md:mb-12 mb-6 text-secondary text-center'>Find your next home</h1>

        <form className='flex items-center md:m-auto md:w-1/2 mx-4 rounded-full bg-white border-gray-200 border-2' onSubmit={handleSearch}>

          <div className='w-full flex flex-col'>
            
            <input type="text" placeholder='Going to' className='block p-6 rounded-full w-full border-2 border-white hover:border-gray-400'
            value={userDestination}
            onChange={handleChangePlace}/>

            {
              userDestinationSuggestions ?
              <div className={`${userDestinationSuggestions ? 'translate-y-0' : '-translate-y-32'} shadow-xl ml-2 absolute mt-20 bg-blue-100 flex flex-col cursor-pointer
              transition-all ease-out duration-700`}>
                {
                  userDestinationSuggestions.map((suggestion, i) =>{
                    return(
                      <p key={i} className='hover:bg-blue-200 p-3'
                      onClick={() => {
                        setUserDestination(suggestion.text);
                        setUserDestinationLatLng(userDestinationSuggestions[i].center);
                        setUserDestinationSuggestions([]);
                      }}>{suggestion.place_name}</p>
                    )
                  })
                }
              </div>
              :
              ''
            }
          </div>

          <div className='bg-gray-200 h-6 w-1'></div>

          <input type="number" placeholder='Guests' className='block p-6 rounded-full w-full border-2 border-white hover:border-gray-400  appearance-none' onChange={(e) => setGuests(e.target.value)}/>
          
          <button className='-ml-16 p-5 bg-tertiary_2 text-white rounded-full'>
            <BiSearch className='w-8 h-8'/>
          </button>


          {/* <div className="flex items-center justify-center">
            <div
              className="relative mb-3 xl:w-96"
              data-te-datepicker-init
              data-te-input-wrapper-init>
              <input
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                placeholder="Select a date"
                data-te-datepicker-toggle-ref
                data-te-datepicker-toggle-button-ref />
              <label
                htmlFor="floatingInput"
                className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                >Select a date
                </label>
            </div>
          </div> */}

          {/* <input type="date" className='block p-3 -ml-8 rounded-l-full w-full border-2 border-gray-400'
          onChange={(e) => setStartDate(e.target.value)}/>        
          <input type="date" className='block p-3 -ml-8 rounded-l-full w-full border-2 border-gray-400'
          onChange={(e) => setEndDate(e.target.value)}/>         */}
          
        </form>
      </div>
    </div>
  )
}

export default SearchForm;

// import React, {Component} from 'react'

// className MyApp extends Component {
//   state = {
//     dates: null
//   }

//   onSelect = dates => this.setState({dates})

//   render() {
//     return (
//       <div>
//         <DateRangePicker
//           onSelect={this.onSelect}
//           value={this.state.dates}
//         />
//       </div>
//     )
//   }
// }


// <div date-rangepicker className="flex items-center">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
//             </div>
//             <input name="start" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start" />
//           </div>
//           <span className="mx-4 text-gray-500">to</span>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
//             </div>
//             <input name="end" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end" />
//         </div>
//         </div>
