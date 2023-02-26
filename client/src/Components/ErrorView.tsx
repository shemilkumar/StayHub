import React from 'react'
import { Link } from 'react-router-dom';
import Button from './Elements/Button';

function ErrorView({error} : {error:string}) {
  return (
    <div className='min-h-screen flex'>
      <div className='m-auto w-3/4 flex flex-col items-center'>
        <h1 className='uppercase text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-tr from-red-500  to-orange-600'>Oh! Something went wrong</h1>
        <h3 className='text-2xl font-semibold mb-4'>{error ? error :'Cant find this route on this server'}</h3>

        <div className='flex gap-2'>
          <Link to={'/'}>
            <Button text='Back To Home' invert={true}/>
          </Link>
          <Link to={'/login'}>
            <Button text='Login'/>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ErrorView;