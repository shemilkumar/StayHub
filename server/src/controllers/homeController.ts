import {NextFunction, Request,Response} from 'express';
import Home, { HomeModel } from '../models/homeModel';
import Booking from '../models/bookingModel';
import catchAsync from '../util/catchAsync';
import * as factory from "../controllers/handleFactory";

export interface searchHomesRequest extends Request{
  nearGuestHomes?: HomeModel[]
}

export const aliasTopHomes = catchAsync( async(req:Request, res: Response, next: NextFunction) : Promise<void> =>{
  req.query.page = '1';
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,address';

  next();
});

export const getNearByHomes = catchAsync( async(req:searchHomesRequest, res: Response, next: NextFunction) : Promise<void> =>{

  const {location,guests} = req.body;

  const [latitude, longitude] = location;

  const geoPoint = {
    type: 'Point',
    // coordinates: [parseFloat(longitude), parseFloat(latitude)],
    coordinates: [(longitude),(latitude)],
  };

  // Find the nearest rental properties to the specified location
  const nearestHomes = await Home.find({
    location: {
      $nearSphere: {
        $geometry: geoPoint,
        $maxDistance: 300 * 1000, // Maximum distance in meters
      },
    },
  });

  const nearGuestHomes = nearestHomes.filter((home) => {
    return home.maxGuests >= guests;
  });

  req.nearGuestHomes = nearGuestHomes;

  res.status(200).json({
    status: 'success',
    results: nearestHomes.length,
    nearestHomes,
    nearGuestHomes,
  });
});


export const getHome = factory.getOne<HomeModel>(Home);
export const getAllHomes = factory.getAll<HomeModel>(Home);
export const createHome = factory.createOne<HomeModel>(Home);
export const updateHome = factory.updateOne<HomeModel>(Home);
export const deleteHome = factory.deleteOne<HomeModel>(Home);