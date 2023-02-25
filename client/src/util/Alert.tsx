import React, { useEffect, useState } from 'react'

function Alert({message} : {message: string}) {

  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, [])
  

  return (
    <div className={`${show ? 'top-0' : '-top-32'} fixed mx-auto inset-x-0 bottom-0 z-50 transition-all duration-500 ease-in-out`}>
      <div className="max-w-lg bg-red-200 mx-auto mt-6 p-2">
        <div className="flex space-x-2">
          <svg className="w-6 h-6 stroke-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <p className="text-red-900 font-semibold">ERROR</p>
        </div>
        <p className="ml-8 text-red-800">{message}</p>
      </div>
    </div>
  )
}

export default Alert;