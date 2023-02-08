import React from 'react'
import Card from './Card';

function HouseSection() {
  return (
    <div className='min-h-screen'>
      <div className='grid grid-cols-3 gap-y-8'>
      {[1,2,3,4,5,6,7,8,9].map(el => <Card/>)}
      </div>
    </div>
  )
}

export default HouseSection;