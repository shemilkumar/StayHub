import{u as i,j as e,a,L as c,b as x,M as u,A as f,c as g,F as p,B as o,d as m,r,S as N}from"./index-06036be2.js";function v({booking:t}){var d;const l=i(),n=async()=>{const s=await m.delete(`/booking/${t._id}`);s.pass&&(s.deleted?window.location.reload():l(`/error/${s.message}`))};return e("div",{children:t.home&&a("div",{className:"aspect-video w-full sm:w-80 md:w-96 shadow-2xl rounded-xl transition-all ease-in-out duration-500 hover:scale-105",children:[a(c,{to:(d=t.home)!=null&&d._id?`/home/${t.home._id}`:"room/fake_id",children:[e("div",{className:"w-full aspect-video md:h-72",children:e("img",{src:`${x}/${t.home.imageCover}`,alt:"house-coverImage",className:"shadow-xl rounded-t-lg object-cover md:h-72 w-full"})}),a("div",{className:"flex flex-col gap-1 md:gap-2 mt-4 md:mt-8 border-b-2 p-3",children:[a("div",{className:"flex justify-between items-center",children:[e("h1",{className:"text-xl md:text-3xl font-semibold",children:t.home.name}),a("h1",{className:"text-3xl text-secondary font-semibold",children:["₹",t.home.price]})]}),a("div",{className:"flex text-gray-500",children:[e(u,{className:"h-5 w-5 "}),e("p",{className:"text-gray-500 text-sm",children:t.home.address})]}),a("div",{className:"flex gap-2 items-center text-xs",children:[a("div",{className:"p-1 bg-green-700 text-white font-semibold inline-flex justify-center items-center gap-1 rounded-lg w-12",children:[t.home.ratingsAverage,e(f,{})]}),a("p",{className:"text-gray-600",children:["(",t.home.ratingsQuantity," Ratings)"]})]}),a("div",{className:"flex gap-4 mt-2 w-10/12 text-xs",children:[a("div",{className:"flex gap-2 rounded-full bg-red-100 p-2",children:[e(g,{className:"h-5 w-5 text-secondary"}),a("p",{className:"text-gray-500",children:[t.home.bedrooms," Rooms"]})]}),a("div",{className:"flex gap-2 rounded-full bg-red-100 p-2",children:[e(p,{className:"h-5 w-5 text-secondary"}),a("p",{className:"text-gray-500",children:[t.home.beds," Beds"]})]})]})]})]}),a("div",{className:"flex justify-between items-center px-3 py-4  m-auto",children:[e("p",{className:"text-green-800 font-semibold text-md md:text-lg",children:`${new Date(t.startDate).toLocaleDateString("en-US",{month:"short",day:"numeric"})} - 
            ${new Date(t.endDate).toLocaleDateString("en-US",{month:"short",day:"numeric"})}`}),e("div",{className:"flex items-center rounded-full shadow-lg",onClick:n,children:e(o,{text:"Cancel Booking",invert:!0,round:!0})})]})]})})}function w(){const t=i(),[l,n]=r.useState(null),d=async()=>{const s=await m.get("/booking/myBookings");if(s.pass){if(!s.fetchedData)return;n(s.fetchedData.data.data.data)}else t(`/error/${s.message}`)};return r.useEffect(()=>{d()},[]),e("div",{children:l?e("div",{className:"min-h-screen flex justify-center items-center",children:l.length===0?a("div",{className:"m-auto flex flex-col transition-all duration-500 ease-in mx-4 md:mx-0",children:[e("h1",{className:"text-xl md:text-3xl text-red-500 font-semibold",children:"No upcoming bookings!"}),e("p",{className:"text-gray-600 mb-4",children:"What are you waiting for? book your home now"}),e(c,{to:"/homes",children:e(o,{text:"Explore Homes"})})]}):a("div",{className:"m-auto mt-24 md:mt-32 mb-16",children:[a("h1",{className:"text-center text-2xl md:text-4xl font-semibold font-sans mb-6 md:mb-12",children:["My",e("span",{className:"text-secondary",children:" Bookings"})]}),e("div",{className:"grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 px-4 md:px-0",children:l.map((s,h)=>e(v,{booking:s},h))})]})}):e(N,{})})}export{w as default};
