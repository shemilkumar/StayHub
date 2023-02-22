import mongoose from "mongoose";
import { type } from "os";
import slugify from "slugify";

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

export interface HomeModel extends mongoose.Document{
  name:string,
  ratingsAverage: number,
  ratingsQuantity: number,
  address: string,
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
  checkIn: string[],
  checkOut: string[],
  description: string,
  summary: string,
  // 
  perks: Perks,
  rules: Rules,
  // 
  slug?: string,
  createdAt?: string
}

const homeSchema = new mongoose.Schema<HomeModel>(
  {
    name: {
      type: String,
      required: [true, 'A home must have a name'],
      unique: true,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must above 1'],
      max: [5, 'Rating must below 5'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
      trim: true,
      required: [true, 'A home must have a address'],
      minlength: [10, 'Adress must be 10 character long'],
      maxlength: [40, 'Adress must be less than 40 character'],
    },
    location: [Number],
    place: {
      type: String,
      trim: true,
      required: [true, 'A home must have a place name'],
    },
    state:{
      type: String,
      trim: true,
      required: [true, 'A home must have a state'],
    },
    imageCover: {
      type: String,
      required: [true, 'A home must have a cover image'],
    },
    images: [String],
    maxGuests: {
      type: Number,
      default: 2
    },
    bedrooms: {
      type: Number,
      required: [true, 'A home must have a number of bedrooms'],
    },
    beds: {
      type: Number,
      required: [true, 'A home must have a number of beds'],
    },
    bathrooms: {
      type: Number,
      required: [true, 'A home must have a number of bathrooms'],
    },
    price: {
      type: Number,
      required: [true, 'A home must have a price'],
    },
    checkIn : [
      {
        type: String,
        required: [true,'check-in time should be specified']
      }
    ],
    checkOut : [
      {
        type: String,
        required: [true,'check-out time should be specified']
      }
    ],
    description: {
      type: String,
      trim: true,
      required: [true,'description time should be specified']
    },
    summary:  {
      type: String,
      trim: true
    },

    perks: {
      kitchen: {
        type: Boolean,
        default: false,
      },
      wifi: {
        type: Boolean,
        default: false,
      },
      pool: {
        type: Boolean,
        default: false,
      },
      parking: {
        type: Boolean,
        default: false,
      },
      washingMachine: {
        type: Boolean,
        default: false,
      },
      ac: {
        type: Boolean,
        default: false,
      },
      fridge: {
        type: Boolean,
        default: false,
      },
      dryer: {
        type: Boolean,
        default: false,
      },
      tv: {
        type: Boolean,
        default: false,
      },
    },
    rules: {
      smoking:  {
        type: Boolean,
        default: false,
      },
      pets:  {
        type: Boolean,
        default: false,
      },
      parties:  {
        type: Boolean,
        default: false,
      },
    },

    slug: String,

    createdAt: {
      type: String,
    select: false
  },
});

homeSchema.index({price: 1, ratingsAverage: -1});
homeSchema.index({slug: 1});

homeSchema.pre('save', function(next){
  this.createdAt = new Date().toISOString();
  this.slug = slugify(this.name, {lower:true});
  next();
});

const Home = mongoose.model<HomeModel>('Home',homeSchema);

export default Home;