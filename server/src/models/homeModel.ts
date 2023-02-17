import mongoose from "mongoose";
import slugify from "slugify";

interface HomeModel extends mongoose.Document{
  name:string,
  price: number,
  ratingsAverage: number,
  ratingsQuantity: number,
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
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
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
    slug: String,
    createdAt: String,
});

homeSchema.pre('save', function(next){
  this.createdAt = new Date().toISOString();
  this.slug = slugify(this.name, {lower:true});
  next();
});

const Home = mongoose.model<HomeModel>('Home',homeSchema);

export default Home;