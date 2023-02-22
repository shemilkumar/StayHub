import {NextFunction, Request,Response} from 'express';
import APIFeatures from '../util/APIFeatures';
import AppError from '../util/AppError';
import catchAsync from '../util/catchAsync';

import User from "../models/userModel";
import Home from '../models/homeModel';


export const deleteOne = (model : typeof Home | typeof User) => catchAsync( async(req:Request, res: Response, next: NextFunction) : Promise<void> =>{

  const {id} = req.params;
  const doc = await model.findByIdAndDelete(id);

  if(!doc) return next(new AppError('No document found with that ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });

});
