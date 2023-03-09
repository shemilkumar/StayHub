import mongoose,{Document} from "mongoose";
import moment from 'moment';

export interface BookingModel extends Document{
  home: mongoose.Schema.Types.ObjectId,
  user: mongoose.Schema.Types.ObjectId,
  price: number,
  startDate: Date,
  endDate: Date,
  bookedDates: Date[],
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
    startDate:{
      type: Date,
      required: [true, 'Booking must have a check-in date']
    },
    endDate:{
      type: Date,
      required: [true, 'Booking must have a check-out date']
    },
    bookedDates : [Date],
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


bookingSchema.pre('save', function(next){

  let dateArray: Date[] = [];
  let checkInDate = moment(this.startDate);
  const checkOutDate = moment(this.endDate);
  while (checkInDate <= checkOutDate) {
      dateArray.push(new Date(moment(checkInDate).format()));
      checkInDate = moment(checkInDate).add(1, 'days');
  }
  this.bookedDates = dateArray;

  next();
});


bookingSchema.pre(/^find/, function(next){
  this.populate('user').populate({
    path: 'home',
    select: 'name'
  });
  next();
});


const Booking = mongoose.model<BookingModel>('Booking',bookingSchema);

export default Booking;