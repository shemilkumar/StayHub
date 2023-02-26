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

export type Data = {
  status: string,
  token: string,
  user?: User,
  data?: any,
  message : string,
}

export interface HomeModel{
  name:string,
  ratingsAverage: number,
  ratingsQuantity: number,
  address: string,
  addressDescription: string,
  place: string,
  state: string
  location: number[],
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
}

export interface User{
  name : string,
  email: string,
  role: string,
}

export interface APIResponse{
  data: Data
}