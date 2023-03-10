import { NextFunction, Request, Response } from 'express';
import Booking, { BookingModel } from '../models/bookingModel';
import * as factory from "../controllers/handleFactory";
import { AuthRequest } from "../controllers/authController";
import catchAsync from '../util/catchAsync';
import AppError from '../util/AppError';

// export const getBooking = factory.getOne<BookingModel>(Booking);
export const getAllBooking = factory.getAll<BookingModel>(Booking);
export const updateBooking = factory.updateOne<BookingModel>(Booking);
export const deleteBooking = factory.deleteOne<BookingModel>(Booking);


export const createBooking = catchAsync( async(req:AuthRequest, res: Response, next: NextFunction): Promise<void> =>{

  if(!req.user){
    next(new AppError('Please log in to book',401));
  }

  const bookingDetails = {
    user: req.user?._id,
    home: req.body.home._id,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    price: req.body.price,
  }

  const newBooking = await Booking.create(bookingDetails);

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
  console.log(bookings);

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