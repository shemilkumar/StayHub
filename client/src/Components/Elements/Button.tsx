import React from 'react'

function Button(props: {text : string, invert?: boolean}) {
  return (
    <>
      <button className={`${props.invert ? 'text-secondary' : 'bg-secondary text-white hover:bg-red-800'} border-secondary border-2 uppercase py-2 px-4 font-medium rounded-full text-sm`}>{props.text}</button>
    </>
  )
}

export default Button