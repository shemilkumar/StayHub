import mongoose,{Document} from "mongoose";

export interface BookingModel extends Document{
  home: mongoose.Schema.Types.ObjectId,
  user: mongoose.Schema.Types.ObjectId,
  price: number,
  createdAt : Date,
  paid: boolean
}

const bookingSchema = new mongoose.Schema<BookingModel>(
  {
    home:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Home',
      required: [true, 'Booking must belong to a Home']
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Booking must belong to a User'],
    },
    price:{
      type: Number,
      required:[true, 'Booking must have a price']
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    paid: {
      type: Boolean,
      default: true
    }
  }
);

bookingSchema.pre(/^find/, function(next){
  this.populate('user').populate({
    path: 'home',
    select: 'name'
  });
  next();
});

const Booking = mongoose.model<BookingModel>('Booking',bookingSchema);

export default Booking;