import React from 'react'

function Button(props: {text : string}) {
  return (
    <>
      <button className='uppercase py-2 px-4 bg-secondary text-white font-medium rounded-full hover:bg-red-800 text-sm'>{props.text}</button>
    </>
  )
}

export default Button