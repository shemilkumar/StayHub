import React, { useEffect, useState } from 'react'

function Alert({message, success} : {message: string, success?: boolean}) {

  const [show, setShow] = useState(false);
  // const [success, setSuccess] = useState(false);

  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, [])
  

  return (
    <div className={`${show ? 'top-0' : '-top-32'} fixed mx-auto inset-x-0 bottom-0 z-50 transition-all duration-500 ease-in-out`}>
      <div className={`${success ? 'bg-green-200' : 'bg-red-200' } max-w-lg mx-auto mt-6 p-2`}>
        <div className="flex space-x-2">
          {success ?
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-green-700">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
          </svg>
          :
          <svg className="w-6 h-6 stroke-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          }
          <p className={`${success ? 'text-green-900' : 'text-red-900' } font-semibold`}>{success ? 'SUCCESS' : 'ERROR'}</p>
        </div>
        <p className={`${success ? 'text-green-800' : 'text-red-800' } ml-8`}>{message}</p>
      </div>
    </div>
  )
}

export default Alert;


