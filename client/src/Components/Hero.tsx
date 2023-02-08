import React from 'react'
import image from '../assets/friends-chilling.jpg';
import HeroBlock from '../util/HeroBlock';

function Hero() {

  const description: String = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias, sunt quas repellat sequi dolorem reiciendis aspernatur ducimus ratione impedit tempora a praesentium necessitatibus harum similique dignissimos dolor quam at, officia nemo qui. Debitis repudiandae tenetur omnis repellendus possimus asperiores ut!";

  return (
    <HeroBlock image={image} description={description} mainHero={true}/>
    // <div className='min-h-screen flex'>
    //   <section className='m-auto'>
    //     <div className='container mx-auto flex justify-between items-center'>
    //       <div className="w-2/5">
    //         <img className='object-cover object-center rounded-3xl' alt='hero-image'
    //         src={image}/>
    //       </div>
    //       <div className='w-3/5 flex'>
    //         <div className='w-9/12 m-auto flex flex-col'>
    //           <h1 className="w-4/5 m-auto text-7xl font-bold mb-8">
    //             Stay
    //             <span className='text-secondary'>Hub</span>
    //           </h1>
    //           <p className='w-4/5 m-auto text-gray-500'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias, sunt quas repellat sequi dolorem reiciendis aspernatur ducimus ratione impedit tempora a praesentium necessitatibus harum similique dignissimos dolor quam at, officia nemo qui. Debitis repudiandae tenetur omnis repellendus possimus asperiores ut!</p>
    //           {/* <h1 className="text-7xl font-bold">Helping you connect with travellers. Even before you get to your hostel.</h1> */}
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </div>
  )
}

export default Hero;

{/* <section className="m-auto text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-full w-5/6 mb-10 md:mb-0">
            <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600" />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <br className="hidden lg:inline-block" />This is the NEW Hostelworld.
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Helping you connect with travellers. Even before you get to your hostel.
            </h1>
            <p className="mb-8 leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">Button</button>
              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button>
            </div>
          </div>
        </div>
      </section> */}