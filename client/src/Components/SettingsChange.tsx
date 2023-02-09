import React from 'react'
import Button from './Elements/Button';
import Input from './Elements/Input';

function SettingsChange() {
  return (
      <div className='px-16'>
        <h1 className='text-2xl uppercase mb-12 text-secondary font-semibold'>Your Account Settings</h1>
        <form>

          <Input id='name' type='text' label='Name' value='Shemilkumar'/>
          <Input id='email' type='email' label='Email address' value='shemil@gmail.com'/>

          <div className='flex gap-4 items-center'>
            <div className='w-20 h-20 rounded-full border-4'></div>
            
            <div className=''>
              <input type="file" accept='image/*' className='opacity-0 overflow-hidden absolute -z-1 focus:outline-[3px] focus:outline focus:outline-secondary text-secondary inline-block border-b-2 border-secondary p-1 cursor-pointer transition-all duration-150'/>

              <label htmlFor="photo" className='outline-[3px] outline-secondary text-secondary inline-block border-b-2 border-secondary p-1 transition-all duration-150 cursor-pointer hover:bg-secondary hover:transform hover:translate-y-[-2px]'>Choose new photo</label>
            </div>

          </div>

          <div className='mt-8 flex justify-end'>
            <Button text='Save Settings'/>
          </div>

        </form>
    </div>
  )
}

export default SettingsChange;