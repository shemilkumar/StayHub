import React from 'react'

function SearchForm() {
  return (
    <div>
      <div className="flex w-full">
        <form className='flex gap-1 m-auto w-full'>

        {/* <input type="text" placeholder='Going to' className='block p-3 rounded-2xl w-full border-2 border-gray-400'/> */}

        <select placeholder='going to' name="places" id="places" className='block p-3 rounded-2xl w-full border-2 border-gray-400'>
            <option value="" disabled selected>Going to</option>
            <option value="kochi">Kochi</option>
            <option value="bangalore">Bangalore</option>
            <option value="chennai">Chennai</option>
        </select>

        <input type="date" className='block p-3 rounded-2xl w-full border-2 border-gray-400'/>        
        <input type="date" className='block p-3 rounded-2xl w-full border-2 border-gray-400'/>        
        <input type="text" placeholder='Guests' className='block p-3 rounded-2xl w-full border-2 border-gray-400'/>
        
        <button className='py-4 px-8 bg-tertiary_2 text-white font-semibold rounded'>Search</button>
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
