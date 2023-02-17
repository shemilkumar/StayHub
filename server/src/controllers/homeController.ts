import {NextFunction, Request,Response} from 'express';
import Home from '../models/homeModel';
import AppError from '../util/AppError';
import catchAsync from '../util/catchAsync';

export const getAllHomes = catchAsync( async(req:Request, res: Response, next: NextFunction) : Promise<void> =>{

  const homes = await Home.find();

  res.status(200).json({
    status: 'success',
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