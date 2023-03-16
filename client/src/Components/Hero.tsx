import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import image from '../assets/friends-chilling.jpg';
import HeroBlock from '../util/HeroBlock';

function Hero() {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [])
  

  // const description: String = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias, sunt quas repellat sequi dolorem reiciendis aspernatur ducimus ratione impedit tempora a praesentium necessitatibus harum similique dignissimos dolor quam at, officia nemo qui. Debitis repudiandae tenetur omnis repellendus possimus asperiores ut!";

  return (
    // <HeroBlock image={image} description={description} mainHero={true}/>

    <div>
      <div className="w-full md:h-screen h-[500px] relative bg-blend-darken">
        <img
          src={image}
          alt="bg"
          className="-z-10  object-cover absolute md:w-full w-screen md:h-screen h-full"
        />

        <div className={`w-full md:h-full h-full flex justify-center text-center md:items-center items-end backdrop-brightness-50`}>
          
          <div className="max-w-same px-3">

            {/* <div className="max-w-same px-3 bg-black rounded-full bg-opacity-20"> */}
  
            <div className={`${loaded ? 'translate-x-0' : '-translate-x-[1200px]'} w-full transition-all duration-1000 ease-in-out`}>
              {/* <h1 className="inline md:text-8xl text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-cyan-700 via-blue-500 to-purple-700">
                SHOPSPOT
              </h1> */}
              <h1 className=" inline md:text-8xl text-3xl font-bold text-gray-200 font-sans">
                Stay
                <span className='text-secondary'>Hub</span>
              </h1>
            </div>

            <div className={`${loaded ? 'opacity-100' : 'opacity-0'} flex justify-center md:w-full transition-all duration-1000 ease-in-out`}>
              {/* <p className="backdrop-filter-50 md:w-5/12 mt-4 md:text-xl md:font-lg text-sm text-gray-100 tracking-wider font-semibold font-sans">
                Online shopping and selling-Shop fashion, gadgets, home, and
                everything, All in one place at shopspot. Everything you'll love
                at affordable prices.
              </p> */}
              <p className='mt-4 text-4xl font-semibold text-gray-100 font-sans'>Looking for a Home to stay 
              <span className='text-secondary'> ?</span>
              </p>
            </div>

            <div className={`${loaded ? 'translate-x-0' : 'translate-x-[1200px]'} flex justify-center md:w-full transition-all duration-1000 ease-in-out`}>
              <Link to={"/products"}>
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
    </div>
  )
}

export default Hero;