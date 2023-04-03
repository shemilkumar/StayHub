import axios from "axios";

export let backendBaseUrl:string = '';

backendBaseUrl = `https://stayhub.shemilkumar.com`;
// backendBaseUrl = `http://127.0.0.1:8000`;

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
    // const token = localStorage.getItem('token');
    // if (token){
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

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
    review: 'I was hesitant to book a home online, but this website made the process easy and hassle-free. The home we stayed in exceeded our expectations and we will definitely be booking again.',
    name: "HOLDEN CAULFIELD",
    job: "Actor"
  },
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBhdmF0YXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=150&q=80",
    review: 'The homes offered on this website are not only comfortable and cozy, but they are also located near breathtaking scenic spots. We loved being able to explore the local area and take in the beautiful scenery.',
    name: "SOPHIE LENNON",
    job: "Public Figure"
  },
  {
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80",
    review: "I've used this website multiple times to book homes for my family and I've never been disappointed. The homes are always well-maintained and the customer service is excellent.",
    name: "OLIVIA DAVID",
    job: "Founder of CTO"
  },
]

