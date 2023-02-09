import React from 'react'

interface Input {
  label: string,
  id:string
  type: string,
  value?:string,
}

function Input(props : Input) {
  return (
    <>
      <label htmlFor={props.id} className='font-semibold'>{props.label}</label>

      <input type={props.type} id={props.id} className='w-full p-4 text-sm text-gray-600 tracking-wide bg-gray-200 mb-8 mt-2 h-12 rounded-sm focus:border-b-secondary border-2 outline-none'
      defaultValue={props.type === 'password' ? '' : props.value}
      placeholder={props.type === 'password' ? '* * * * * * * *' : ''}
      />
    </>
  )
}

export default Input;