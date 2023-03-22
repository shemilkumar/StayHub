import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import image from '../assets/friends-chilling.jpg';

function Hero() {

  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setLoaded(true);
  }, [])

  return (
    <>
      <div className="relative w-full h-[450px] md:h-screen bg-blend-darken">

        <img
          src={image}
          alt="bg"
          className="absolute h-full w-screen md:w-full md:h-screen -z-10 object-cover "
        /> 

        <div className={`w-full h-full flex justify-center text-center md:items-center items-end backdrop-brightness-50`}>

          <div className="md:max-w-same md:px-3">
  
            <div className={`${loaded ? 'translate-x-0' : '-translate-x-[1200px]'} w-full transition-all duration-1000 ease-in-out`}>
            
              <h1 className=" inline md:text-8xl text-5xl font-bold text-gray-200 font-sans">
                Stay
                <span className='text-secondary'>Hub</span>
              </h1>
            </div>

            <div className={`${loaded ? 'opacity-100' : 'opacity-0'} flex justify-center md:w-full transition-all duration-1000 ease-in-out`}>
             
              <p className='mt-2 md:mt-4 text-2xl md:text-4xl font-semibold text-gray-100 font-sans'>Looking for a Home to stay ?
              </p>
            </div>

            <div className={`${loaded ? 'translate-x-0' : 'translate-x-[1200px]'} flex justify-center md:w-full transition-all duration-1000 ease-in-out`}>
              <Link to={"/homes"}>
                <button
                  type="button"
                  className="md:mt-6 mt-4 px-2 py-1.5 md:px-6 md:text-xl text-md font-semibold font-sen uppercase text-white  border-secondary border-2 md:border-4 bg-secondary hover:bg-transparent hover:text-white focus:ring-4 focus:ring-blue-300 md:py-2.5 mb-2 dark:bg-transparent dark:hover:bg-blue-gradient focus:outline-none dark:focus:ring-blue-800"
                >
                  Explore Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero;