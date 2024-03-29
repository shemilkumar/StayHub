import React from 'react'
import 'tw-elements';
import { backendStaticHomesUrl } from '../Constants/constant';
import { HomeModel } from '../Constants/modelTypes';

function ImageCarousel({home} : {home: HomeModel}) {
  return (
    <>
      <div id="carouselExampleControls" className="carousel slide relative" data-bs-ride="carousel">
        <div className="carousel-inner relative w-full overflow-hidden">
          <div className="carousel-item active relative float-left w-full ">
            <img
              src={`${backendStaticHomesUrl}/${home.imageCover}`}
              className="block w-full"
              alt="coverImage"
            />
          </div>

          {
            home.images.map((image : string,i : number) => {
              return(
                <div className="carousel-item relative float-left w-full" key={i}>
                  <img
                    src={`${backendStaticHomesUrl}/${image}`}
                    className="block w-full"
                    alt="home-photo"
                  />
                </div>
              )
            })
          }
        </div>

        <button
          className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  )
}

export default ImageCarousel;