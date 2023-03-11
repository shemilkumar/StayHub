import { NextFunction, Request, Response } from 'express';
import Booking, { BookingModel } from '../models/bookingModel';
import * as factory from "../controllers/handleFactory";
import { AuthRequest } from "../controllers/authController";
import catchAsync from '../util/catchAsync';
import AppError from '../util/AppError';
import Email from '../util/Email/email';

// export const getBooking = factory.getOne<BookingModel>(Booking);
export const getAllBooking = factory.getAll<BookingModel>(Booking);
export const updateBooking = factory.updateOne<BookingModel>(Booking);
export const deleteBooking = factory.deleteOne<BookingModel>(Booking);


export const createBooking = catchAsync( async(req:AuthRequest, res: Response, next: NextFunction): Promise<void> =>{

  if(!req.user){
    next(new AppError('Please log in to book homes',401));
  }

  const bookingDetails = {
    user: req.user?._id,
    home: req.body.home._id,
    price: req.body.home.price,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  }

  const newBooking = await Booking.create(bookingDetails);

  if(newBooking) new Email(req.user!, `http://127.0.0.1:5173/myBookings`).sendBookingConfirmation();

  res.status(201).json({
    status: 'success',
    data:{
      data: newBooking
    }
  });
});

export const getBooking = catchAsync( async(req:AuthRequest, res: Response, next: NextFunction): Promise<void> =>{

  const homeId = req.params.id;
  const bookings = await Booking.find({home: homeId});

  const allBookedDates: Date[] = [];

  bookings.map((singleBooking) => {
    allBookedDates.push(...(singleBooking.bookedDates));
  });

  res.status(201).json({
    status: 'success',
    data:{
      data: bookings
    },
    allBookedDates
  });
});

export const getMyBookings = catchAsync( async(req:AuthRequest, res: Response, next: NextFunction): Promise<void> =>{

  if(!req.user){
    next(new AppError('Please log in to get your bookings',401));
  }

  const user = req.user?._id;
  const myBookings = await Booking.find({user});


  res.status(201).json({
    status: 'success',
    results: myBookings.length,
    data:{
      data: myBookings
    },
  });
});