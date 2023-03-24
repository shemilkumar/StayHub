import mongoose,{Document} from "mongoose";
import moment from 'moment';

export interface BookingModel extends Document{
  home: mongoose.Schema.Types.ObjectId,
  user: mongoose.Schema.Types.ObjectId,
  price: number,
  startDate: Date,
  endDate: Date,
  bookedDates: Date[],
  active: Boolean,
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
    active: {
      type: Boolean,
      default: true
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


bookingSchema.pre('save', function(next){

  let dateArray: Date[] = [];
  let checkInDate = moment(this.startDate);
  const checkOutDate = moment(this.endDate);
  while (checkInDate <= checkOutDate) {
      dateArray.push(new Date(moment(checkInDate).format()));
      checkInDate = moment(checkInDate).add(1, 'days');
  }
  this.bookedDates = dateArray;
  this.active = true;

  next();
});


bookingSchema.pre(/^find/, function(next){
  this.populate('user').populate('home');
  next();
});

bookingSchema.pre(/^find/, async function(next){
  await Booking.updateMany(
    { 
      startDate: { $lt: new Date() }
    }, 
    { 
      $set: { active: false }
    }
  );
  next();
});


const Booking = mongoose.model<BookingModel>('Booking',bookingSchema);

export default Booking;