import mongoose from "mongoose";

interface Perks {
  "kitchen": boolean,
  "wifi": boolean,
  "pool": boolean,
  "parking": boolean,
  "washingMachine": boolean,
  "ac": boolean,
  "fridge": boolean,
  "dryer": boolean,
  "tv": boolean
}
interface Rules {
  "smoking": boolean,
  "pets": boolean,
  "parties": boolean
}

export interface HomeModel{
  name:string,
  ratingsAverage: number,
  ratingsQuantity: number,
  address: string,
  addressDescription: string,
  place: string,
  state: string
  location: {
    type: 'Point';
    coordinates: [number, number];
  },
  imageCover:string,
  images: string[],
  maxGuests: number,
  bedrooms: number,
  beds: number,
  bathrooms: number,
  price: number,
  mrpPrice: number,
  checkIn: string[],
  checkOut: string[],
  description: string,
  summary: string,
  // 
  perks: Perks,
  rules: Rules,
  // 
  slug?: string,
  createdAt?: string,
  discount?: number,

  _id: mongoose.Schema.Types.ObjectId
}

export interface BookingModel{
  home: HomeModel,
  user: User,
  price: number,
  startDate: Date,
  endDate: Date,
  bookedDates: Date[],
  createdAt : Date,
  paid: boolean,
  _id: mongoose.Schema.Types.ObjectId
}

export interface User{
  name : string,
  email: string,
  role: string,
  photo: string,
}

export type Data = {
  status: string,
  token: string,
  message : string,
  user?: User,
  data?: any,
  stats?: Stats[],
  bestSellers?: HomeModel[],
  allBookedDates?: string[],
  order?: any,
  nearGuestHomes?: HomeModel[],
  
}

export interface Stats{
  _id: mongoose.Schema.Types.ObjectId, 
  bookings: number
}

export interface APIResponse{
  data: Data
  status?: number
}