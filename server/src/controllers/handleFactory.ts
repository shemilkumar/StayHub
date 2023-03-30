import {NextFunction, Request,Response} from 'express';
import { Model } from 'mongoose';
import APIFeatures from '../util/APIFeatures';
import AppError from '../util/AppError';
import catchAsync from '../util/catchAsync';

interface QueryParams{
  [key:string] : string
}

export const getAll = <T>(Model: Model<T>) => catchAsync( async(req:Request, res: Response, next: NextFunction) : Promise<void> =>{
  
  console.log("hi");

  const features = new APIFeatures(Model.find(),req.query as QueryParams)
    ?.filter()
    ?.sort()
    ?.limitFields()
    ?.paginate();

  if(!features) return next(new AppError('Something went wrong',404));
  const doc = await features.query;

  // res.setHeader('Cache-Control', 'max-age=3600');

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: doc
  });
});

export const deleteOne = <T>(Model: Model<T>) => catchAsync( async(req:Request, res: Response, next: NextFunction) : Promise<void> =>{

  const doc = await Model.findByIdAndDelete(req.params.id);

  if(!doc) return next(new AppError('No document found with that ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});


export const updateOne = <T>(Model: Model<T>) => catchAsync( async(req:Request, res: Response, next: NextFunction) : Promise<void> =>{

  const {id} = req.params;
  const data = req.body;

  const doc = await Model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
  });

  if(!doc) return next(new AppError('No document found with that ID', 404));

  res.status(201).json({
    status: 'success',
    data:{
      data : doc
    }
  });
});

export const createOne = <T>(Model: Model<T>)  =>catchAsync( async(req:Request, res: Response, next: NextFunction): Promise<void> =>{

  const doc = await Model.create(req.body);

  res.status(201).json({
    status: 'success',
    data:{
      data: doc
    }
  });
});


export const getOne = <T>(Model: Model<T>) => catchAsync( async(req:Request, res: Response, next: NextFunction) : Promise<void> =>{

  const doc = await Model.findOne({_id : req.params.id});

  if(!doc) return next(new AppError('No document found with that ID',400))

  res.status(200).json({
    status: 'success',
    data: doc
  });
});

