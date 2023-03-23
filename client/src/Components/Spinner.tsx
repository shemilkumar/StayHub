import React from 'react'

function Spinner() {

  return (
    <div className='flex w-full min-h-screen'>
      <span className="flex h-12 w-12 m-auto">
        <span className="animate-ping inline-flex h-full w-full rounded-full bg-secondary opacity-100"></span>
      </span>
    </div>
  )
}

export default Spinner;