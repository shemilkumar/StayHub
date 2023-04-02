import { NextFunction, Request, Response } from 'express';
import Booking, { BookingModel } from '../models/bookingModel';
import Home, { HomeModel } from '../models/homeModel';
import * as factory from "../controllers/handleFactory";
import catchAsync from '../util/catchAsync';
import AppError from '../util/AppError';
import Email from '../util/Email/email';
import { searchHomesRequest } from './homeController';

import { AuthRequest } from "../controllers/authController";
import getMainUrl from '../util/URLGetter';

// export const getBooking = factory.getOne<BookingModel>(Booking);
export const getAllBooking = factory.getAll<BookingModel>(Booking);
export const deleteBooking = factory.deleteOne<BookingModel>(Booking);
export const updateBooking = factory.updateOne<BookingModel>(Booking);

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

  
  if(newBooking) new Email(req.user!, `${getMainUrl()}/myBookings`).sendBookingConfirmation();

  res.status(201).json({
    status: 'success',
    data:{
      data: newBooking
    }
  });
});

export const getBooking = catchAsync( async(req:AuthRequest, res: Response, next: NextFunction): Promise<void> =>{

  const homeId = req.params.id;
  const bookings = await Booking.find({home: homeId, active: {$ne : false}});

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
  const myBookings = await Booking.find({user, active: {$ne : false}});


  res.status(201).json({
    status: 'success',
    results: myBookings.length,
    data:{
      data: myBookings
    },
  });
});

export const getBookingStats = catchAsync( async(req:Request, res: Response, next: NextFunction) : Promise<void> =>{

  const stats = await Booking.aggregate([
    {
      $group:{
        _id: '$home',
        bookings: { $sum : 1 },
      }
    },
    { 
      $sort: { bookings: -1 }
    },
    {
      $limit : 3
    }
  ]);
  
  const bestSellerIds = stats.map((home) => home._id);
  
  const bestSellers = await Home.find({ 
    '_id': { $in: bestSellerIds}
    });

  res.status(200).json({
    status: 'success',
    stats,
    bestSellers
  });

});


export const getNearByNotBookedHomes = catchAsync( async(req:searchHomesRequest, res: Response, next: NextFunction) : Promise<void> =>{

  const dates = (req.body.searchDates).map((dateString: string) => new Date(dateString));

  if(!req.nearGuestHomes){
    return next(new AppError('Not able to get nearby homes',400));
  }

  const {nearGuestHomes} = req;

  const nearByNotBookedHomes: HomeModel[] = [];

  nearGuestHomes.map(async guesthomes => {
    const bookedHomes = await Booking.find({ home : guesthomes._id});

    if(bookedHomes.length === 0){
      nearByNotBookedHomes.push(guesthomes);
    }

    bookedHomes.forEach(bookedHome => {
      if (!(bookedHome.bookedDates).some(bookeddates => dates.includes(bookeddates))) {
        nearByNotBookedHomes.push(guesthomes);
      }
    });


    res.status(200).json({
      status: 'success',
      searchResultHomes : nearByNotBookedHomes
    });

  });

});