import React from 'react'
import { Link } from 'react-router-dom';
import Button from './Elements/Button';

function ErrorView({error} : {error:string}) {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='m-auto md:w-3/4 flex flex-col items-center mx-3 md:mx-0'>
        <h1 className='uppercase text-xl md:text-5xl font-extrabold mb-1 md:mb-4 text-transparent bg-clip-text bg-gradient-to-tr from-red-500  to-orange-600'>Oh! Something went wrong</h1>
        <h3 className='text-sm md:text-2xl font-semibold mb-4'>{error ? error :'Cant find this route on this server'}</h3>

        <div className='flex gap-2'>
          <Link to={'/'}>
            <Button text='Back To Home' invert={true}  round={true}/>
          </Link>
          <Link to={'/login'}>
            <Button text='Login' round={true}/>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ErrorView;