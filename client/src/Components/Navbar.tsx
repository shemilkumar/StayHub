import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='fixed w-[80%]'>
      <div className="flex justify-between items-center p-4 font-semibold bg-primary text-secondary">
        <div className="text-3xl cursor-pointer">StayHub</div>
        <div className="flex gap-4 shadow-md py-4 px-8 rounded-full cursor-pointer">
          <span className=''>Home</span>
          <span>Houses</span>
          <span>About</span>
        </div>
        <div className="flex items-centers gap-4 cursor-pointer">
        <Link to="/login">
          <span className="py-2">Login</span>
        </Link>
        <Link to="/signup">
          <span className='py-2 px-4 border-2 border-gray-300 rounded-full hover:bg-secondary hover:text-white hover:border-secondary'>SignUp</span>
        </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar;


// import React, { useState, useEffect } from "react";

// const Navbar = () => {
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const [navbarVisible, setNavbarVisible] = useState(true);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollPos = window.pageYOffset;
//       if (currentScrollPos > scrollPosition) {
//         setNavbarVisible(false);
//       } else {
//         setNavbarVisible(true);
//       }
//       setScrollPosition(currentScrollPos);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [scrollPosition]);

//   return (
//     <nav
//       className={`fixed w-full z-50 top-0 ${
//         navbarVisible ? "transition ease-in duration-500" : "hidden"
//       }`}
//     >
//       <div className="container mx-auto px-4 h-16 flex items-center justify-between">
//         <a href="#" className="font-bold text-xl">
//           Your logo
//         </a>
//         <ul className="flex">
//           <li>
//             <a href="#" className="block px-3 py-2">
//               Home
//             </a>
//           </li>
//           <li>
//             <a href="#" className="block px-3 py-2">
//               About
//             </a>
//           </li>
//           <li>
//             <a href="#" className="block px-3 py-2">
//               Contact
//             </a>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;