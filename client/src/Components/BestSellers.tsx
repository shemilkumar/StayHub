import React from 'react'
import Card from './Card';

function BestSellers() {
  return (
    <div className='min-h-screen flex flex-col gap-12 justify-center items-center'>
      <h1 className='text-6xl text-gray-700 font-semibold'>Best Sellers</h1>
      <div className='grid grid-cols-3 gap-8 '>
        <Card/>
        <Card/>
        <Card/>
      </div>
    </div>
  )
}

export default BestSellers;