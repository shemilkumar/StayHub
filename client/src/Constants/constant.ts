import axios from "axios";

export let frondendBaseUrl: string = '';
export let backendBaseUrl:string = '';

// frondendBaseUrl = `https://stayhub.shemilkumar.com`;
backendBaseUrl = `https://stayhub.shemilkumar.com`;

// if(import.meta.env.VITE_NODE_ENV === 'production'){
//   frondendBaseUrl = `https://stayhub.shemilkumar.com`;
//   backendBaseUrl = `https://stayhub.shemilkumar.com`;
//   // console.log(frondendBaseUrl, backendBaseUrl);
// }else{
//   frondendBaseUrl = 'http://127.0.0.1:5173'
//   backendBaseUrl = 'http://127.0.0.1:8000';
// }

export const backendStaticUserUrl = `${backendBaseUrl}/public/img/users`;
export const backendStaticHomesUrl = `${backendBaseUrl}/public/img/homes`;

export const axiosApi = axios.create({
  baseURL: `${backendBaseUrl}/api/v1/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token){
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      // For requests with FormData payload, set the Content-Type to multipart/form-data
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      // For other requests, set the Content-Type to application/json
      config.headers['Content-Type'] = 'application/json';
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface Testimonial {
  image: string,
  review: string,
  name: string,
  job: string,
}

export const TestimonialData: Testimonial[] = [
  {
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    review: 'Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90\'s cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.',
    name: "HOLDEN CAULFIELD",
    job: "Senior Product Designer"
  },
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBhdmF0YXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=150&q=80",
    review: 'Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90\'s cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.',
    name: "SOPHIE LENNON",
    job: "UI Develeoper"
  },
  {
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80",
    review: 'Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90\'s cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.',
    name: "OLIVIA DAVID",
    job: "CTO"
  },
]

