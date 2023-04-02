import{c as d,L as a,j as s,e as l,f as i,M as t,A as r,B as c,F as n}from"./index-85cf5052.js";function x({home:e}){return d("div",{children:e&&d(a,{to:e!=null&&e._id?`/home/${e._id}`:"room/fake_id",children:s("div",{className:"w-full md:w-96 shadow-2xl rounded-xl transition-all ease-in-out duration-500 hover:scale-105",children:[d("div",{className:"aspect-video w-full md:h-72",children:d(l.LazyLoadImage,{alt:"HomeImage",src:`${i}/${e.imageCover}`,effect:"blur",className:"shadow-xl rounded-t-lg object-cover w-full md:h-72"})}),s("div",{className:"flex flex-col gap-1 md:gap-4 mt-4 md:mt-8 border-b-2 pl-2 md:pl-0 items-start md:items-center",children:[d("h1",{className:"text-xl md:text-3xl font-semibold text-center",children:e.name}),s("div",{className:"flex md:hidden items-center",children:[d("p",{className:"text-gray-500 text-xs md:text-sm",children:e.address.split(",")[0]}),d(t,{className:"h-5 w-5"})]}),s("div",{className:"flex justify-between md:justify-center w-full mb-2 md:mb-0",children:[s("div",{className:"flex gap-2 items-center justify-start text-xs mb-2 md:mb-0",children:[s("div",{className:"p-1 bg-green-700 text-white font-semibold inline-flex justify-center items-center gap-1 rounded-lg w-12",children:[e.ratingsAverage,d(r,{})]}),s("p",{className:"text-gray-600",children:["(",e.ratingsQuantity," Ratings)"]})]}),s("div",{className:"md:hidden mr-4 font-semibold text-2xl md:text-green-700 text-secondary",children:["₹",e.price]})]}),d("p",{className:"hidden md:flex text-gray-400 text-xs md:text-base w-10/12 md:h-20 h-24",children:e.description}),s("div",{className:"hidden md:flex justify-between m-2 w-10/12",children:[s("div",{className:"flex gap-2 ",children:[d(c,{className:"h-5 w-5 text-secondary"}),s("p",{className:"text-gray-500",children:[e.bedrooms," Rooms"]})]}),s("div",{className:"flex gap-2",children:[d(n,{className:"h-5 w-5 text-secondary"}),s("p",{className:"text-gray-500",children:[e.beds," Beds"]})]})]})]}),s("div",{className:"hidden md:flex md:flex-row justify-end md:justify-between py-2 md:py-4 w-10/12 m-auto",children:[s("div",{className:"font-semibold text-xl md:text-green-700 text-secondary",children:["₹",e.price]}),s("div",{className:"hidden md:flex items-center",children:[d(t,{className:"h-5 w-5"}),d("p",{className:"text-gray-500 text-xs md:text-sm",children:e.address})]})]})]})})})}export{x as default};
