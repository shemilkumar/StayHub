import React from 'react'

interface HeroProps{
  image : any,
  description: String,
  mainHero? : boolean,
  subHeading?: String,
  switchFlex?: boolean,
}

function HeroBlock(props : HeroProps) {
  return (
    <div className='min-h-screen flex'>
      <section className='m-auto'>
        <div className={`${props.switchFlex ? "flex flex-row-reverse" : "flex"} container mx-auto justify-between items-center`}>
          <div className="w-2/5">
            <img className='object-cover object-center rounded-3xl' alt='hero-image'
            src={props.image}/>
          </div>
          <div className='w-3/5 flex'>
            <div className='w-9/12 m-auto flex flex-col'>

              {props.mainHero ? 
              <h1 className="w-4/5 m-auto text-7xl font-bold mb-8">
                Stay
                <span className='text-secondary'>Hub</span>
              </h1> 
              :
              <h1 className="w-4/5 m-auto text-5xl font-bold mb-8">
                {props.subHeading}
              </h1> 
              }

              <p className='w-4/5 m-auto text-gray-500'>
                {props.description}
              </p>
              {/* <h1 className="text-7xl font-bold">Helping you connect with travellers. Even before you get to your hostel.</h1> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HeroBlock;