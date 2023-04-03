import { TestimonialData } from "../Constants/constant";

function Testimonial() {
  return (
    <>
      <section className="text-gray-600 body-font flex">
        <div className="container px-5 py-20 md:py-24 m-auto">
          <h1 className="text-4xl md:text-6xl text-gray-700 font-semibold flex justify-center mb-24 font-sans ">Testi
            <span className="text-secondary">monials</span>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 -m-4">
            {
              TestimonialData.map((testimonial,i) => {
                return(
                  <div key={i} className="md:mb-0 mb-6 p-4">
                    <div className="h-full text-center">
                      <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" 
                      src={testimonial.image} />
                      <p className="leading-relaxed md:h-44 lg:h-28">{testimonial.review}</p>
                      <span className="inline-block h-1 w-10 rounded bg-secondary mt-6 mb-4"></span>
                      <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">{testimonial.name}</h2>
                      <p className="text-gray-500">{testimonial.job}</p>
                    </div>
                  </div>
                )
              })
            }           
          </div>
        </div>
      </section>
    </>
  )
}

export default Testimonial;