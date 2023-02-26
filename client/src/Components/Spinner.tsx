import React from 'react'
import { useNavigate } from 'react-router-dom';

function Spinner() {

  // const navigate = useNavigate();

  // setTimeout(() => {
  //   navigate(`/error/Connection lost, Please try again later`)
  // }, 10000);

  return (
    <div className='flex w-full min-h-screen'>
      <span className="flex h-12 w-12 m-auto">
        <span className="animate-ping inline-flex h-full w-full rounded-full bg-secondary opacity-100"></span>
      </span>
    </div>
  )
}

export default Spinner;

{/* <div className="flex items-center justify-center">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span
          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span>
      </div>
    </div> */}