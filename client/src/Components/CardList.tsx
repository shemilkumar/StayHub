import { AiFillStar } from "react-icons/ai";
import { BsHouseDoorFill } from "react-icons/bs";
import { FaBed } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import { backendStaticHomesUrl } from "../Constants/constant";
import { HomeModel } from "../Constants/modelTypes";

function CardList( {home} : {home:HomeModel}) {

  return (
    <div>
    { home &&
      <Link to={home?._id ? `/room/${home._id}` : 'room/fake_id'}>
        <div className="w-full flex justify-between shadow-2xl transition-all ease-in-out duration-500 hover:scale-100">
          <div className='h-72 w-96'>
            <img src={`${backendStaticHomesUrl}/${home.imageCover}`} alt="house-coverImage" 
            className='shadow-xl object-cover h-72'/>
          </div>

          <div className='flex flex-col mx-4 mt-0 border-b-2 w-1/2'>
            <h1 className='text-3xl font-semibold'>{home.name}</h1>
            <p className="text-gray-600 mb-4">{home.address}</p>

            <div className="flex gap-2 items-center text-sm">
              <div className='p-1 bg-green-700 text-white font-semibold inline-flex justify-center items-center gap-1 rounded-lg w-12'>
              {home.ratingsAverage}
                <AiFillStar/>
              </div>

              <p className="text-gray-600">({home.ratingsQuantity} Ratings)</p>
            </div>

            <p className='text-gray-400 text-md h-20 mt-4 w-9/12'>{home.description}</p>

            <div className='flex items-center mt-2'>
                <MdLocationOn className='h-5 w-5'/>
                <p className='text-gray-500 text-sm'>{home.address}</p>
            </div>

            <div className='flex gap-4 mt-2 w-10/12'>
              <div className='flex gap-2 rounded-full bg-red-100 p-2'>
                <BsHouseDoorFill className='h-5 w-5 text-secondary'/>
                <p className='text-gray-500'>{home.bedrooms} Rooms</p>
              </div>
              <div className='flex gap-2 rounded-full bg-red-100 p-2'>
                <FaBed className='h-5 w-5 text-secondary'/>
                <p className='text-gray-500'>{home.beds} Beds</p>
              </div>
            </div>
          </div>

            <div className='flex flex-col py-4 m-auto'>
              <div className="flex gap-2">
                <span className='stroke text-gray-500 text-base line-through'>${home.mrpPrice}</span>
                <span className='text-yellow-600 text-base font-semibold'>{home.discount}% off</span>
              </div>
              <div className='font-semibold text-4xl text-secondary'>${home.price}</div>
              <p className="text-sm text-gray-400">per room per night</p>
            </div>

        </div>
      </Link>
    }    
    </div>
  )
}

export default CardList;