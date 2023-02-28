import axios from "axios";

interface Testimonial {
  image: string,
  review: string,
  name: string,
  job: string,
}

export const backendBaseUrl: string = 'http://127.0.0.1:8000';
export const backendStaticUserUrl = `${backendBaseUrl}/public/img/users`;
// http://127.0.0.1:8000/public/img/users/user-63fcd99f01813ed932e71cbf-1677516687758.jpeg

export const axiosApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const TestimonialData: Testimonial[] = [
  {
    image: "https://dummyimage.com/302x302",
    review: 'Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90\'s cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.',
    name: "HOLDEN CAULFIELD",
    job: "Senior Product Designer"
  },
  {
    image: "https://dummyimage.com/302x302",
    review: 'Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90\'s cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.',
    name: "ALPER KAMU",
    job: "UI Develeoper"
  },
  {
    image: "https://dummyimage.com/302x302",
    review: 'Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90\'s cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.',
    name: "HENRY LETHAM",
    job: "CTO"
  },
]

