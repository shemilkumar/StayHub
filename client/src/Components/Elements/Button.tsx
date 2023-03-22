import React from 'react'

function Button(props: {text : string, invert?: boolean, round?: boolean}) {
  return (
    <>
      <button className={`${props.invert ? 'md:text-secondary text-white bg-secondary md:bg-transparent' : 'bg-secondary text-white hover:bg-red-800'} ${props.round ? 'md:rounded-full rounded-lg' : 'rounded-lg'} border-secondary border-2 uppercase py-1.5 px-1.5 md:py-2 md:px-4 font-medium md:text-sm text-xs`}>{props.text}</button>
    </>
  )
}

export default Button