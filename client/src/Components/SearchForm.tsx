import axios from 'axios';
import React, { ChangeEvent, FormEvent, InputHTMLAttributes, useState } from 'react'
import { BiSearch } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import apiRequest, { FetchChecked } from '../api/apiRequest';
import { setAllSearchResult } from '../Redux/Slicers/searchResultSlice';

function SearchForm() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userDestination, setUserDestination] = useState('');
  const [userDestinationSuggestions, setUserDestinationSuggestions] = useState<[] | null>(null);
  const [userDestinationData, setUserDestinationData] = useState([]);
 
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guests, setGuests] = useState('');

  function getDatesInRange(dateStart : string, dateEnd : string) {
    const dates = [];
    console.log(dateStart,dateEnd);
    let currentDate = new Date(dateStart);
    let endDate = new Date(dateEnd);
  
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return dates;
  }
  

  const handleSearch = async(e : FormEvent) => {
    e.preventDefault();

    if(userDestinationData.length === 0 || !guests){
      alert('Fill user destination and number of guests');
      return;
    }
    // console.log(userDestinationData);

    const searchData = {
      location : userDestinationData,
      searchDates: getDatesInRange(startDate,endDate),
      guests: parseInt(guests)
    }

    // console.log(searchData);

    const nearByHomes = await apiRequest.post('/homes/nearestHomes',searchData) as FetchChecked;

    if(nearByHomes.pass){
      if(!nearByHomes.fetchedData) return;

      // console.log(nearByHomes.fetchedData.data);
      dispatch(setAllSearchResult(nearByHomes.fetchedData.data.nearGuestHomes));
      navigate('/searchResult');
      //  Here I have to pass data to <SearchResultPage/>

    }else alert(nearByHomes.message);
  };

  const handleChangePlace = async(e : ChangeEvent<HTMLInputElement>) =>{
    setUserDestination(e.target.value);

    if(e.target.value = '') setUserDestinationData([]);
    // console.log('Hiii');

    const config = { 
      headers: {
      'Content-Type': 'application/json',
      }
    }

    const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic2hlbWlsIiwiYSI6ImNsZTVhdjBtejBiOXMzcHFkeDdzenVubnQifQ.ELopMEw5SnKU0QOU85_Bdg';

    const mapBoxResult = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${userDestination}.json?country=IN&access_token=${MAPBOX_ACCESS_TOKEN}`, config);

  //  &access_token=YOUR_MAPBOX_ACCESS_TOKEN"

    // console.log(mapBoxResult.data);
    setUserDestinationSuggestions(mapBoxResult.data.features);
  }

  return (
    <div>
      <div className="flex flex-col w-full mt-40">

        <h1 className='text-5xl font-semibold font-sans mb-12 text-secondary text-center'>Find your next home</h1>

        <form className='flex m-auto w-1/2 rounded-full bg-white border-gray-200 border-2 items-center' onSubmit={handleSearch}>

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
                      onClick={(e) => {
                        setUserDestination(suggestion.text);
                        setUserDestinationData(userDestinationSuggestions[i].center);
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
