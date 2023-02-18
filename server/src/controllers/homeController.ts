import {NextFunction, Request,Response} from 'express';
import Home from '../models/homeModel';
import APIFeatures from '../util/APIFeatures';
import AppError from '../util/AppError';
import catchAsync from '../util/catchAsync';

interface QueryParams{
  [key:string] : string
}

export const aliasTopHomes = catchAsync( async(req:Request, res: Response, next: NextFunction) : Promise<void> =>{
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,address';

  next();
});

export const getAllHomes = catchAsync( async(req:Request, res: Response, next: NextFunction) : Promise<void> =>{
  
  const features = new APIFeatures(Home.find(),req.query as QueryParams)
    ?.filter()
    ?.sort()
    ?.limitFields()
    ?.paginate();

  if(!features) return next(new AppError('Something went wrong',404));
  const homes = await features.query;

  res.status(200).json({
    status: 'success',
    results: homes.length,
    homes,
  });
});


export const createHome = catchAsync( async(req:Request, res: Response, next: NextFunction): Promise<void> =>{

  const newHome = await Home.create(req.body);

    res.status(201).json({
      status: 'success',
      data:{
        home: newHome,
      }
    });
});

export const getHome = catchAsync( async(req:Request, res: Response, next: NextFunction) : Promise<void> =>{

  const {id} = req.params;
  const doc = await Home.findOne({_id : id});

  if(!doc) return next(new AppError('No document found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      home : doc
    }
  })
});

export const updateHome = catchAsync( async(req:Request, res: Response, next: NextFunction) : Promise<void> =>{

  const {id} = req.params;
  const data = req.body;

  const doc = await Home.findByIdAndUpdate(id,data,{
    new:true,
    runValidators:true,
  })

  if(!doc) return next(new AppError('No document found with that ID', 404));

  res.status(201).json({
    status: 'success',
    data:{
      home: doc
    }
  })
});

export const deleteHome = catchAsync( async(req:Request, res: Response, next: NextFunction) : Promise<void> =>{

  const {id} = req.params;
  const doc = await Home.findByIdAndDelete(id);

  if(!doc) return next(new AppError('No document found with that ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  })
});