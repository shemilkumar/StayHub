import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import AppError from "../util/AppError";
import catchAsync from "../util/catchAsync";
import { AuthRequest } from "../controllers/authController";


const filterObj = (obj : {[key:string]: any}, ...allowedFields: string[]): object =>{
  const newObj: {[key:string]: any} = {};
  Object.keys(obj).forEach(val => {
    if(allowedFields.includes(val)) newObj[val] = obj[val];
  })

  return newObj;
}

export const updateMe = catchAsync( async(req:AuthRequest, res: Response, next: NextFunction) : Promise<void> =>{

  if(req.body.password || req.body.passwordConfirm)
    return next(new AppError('This is route is not for password updates. Please use updateMyPassword',400));
  
  const filteredBody = filterObj(req.body,'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user!.id, filteredBody,{
    new:true,
    runValidators:true
  });

  res.status(200).json({
    status:'success',
    data:{
      user: updatedUser
    }
  })
});

export const deleteMe = catchAsync( async(req:AuthRequest, res: Response, next: NextFunction) : Promise<void> =>{

  await User.findByIdAndUpdate(req.user?.id, {active : false});

  res.status(204).json({
    status: 'success',
    data: null
  })
});

export const getAllUsers = catchAsync(async(req:Request, res:Response, next:NextFunction): Promise<void> => {

  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    users,
  });
});

export const getUser = catchAsync( async(req:Request, res: Response, next: NextFunction) : Promise<void> =>{

  const user = await User.findOne({_id : req.params.id});

  if(!user) return next(new AppError('There is no value as id in this route',400))
  

  res.status(200).json({
    status: 'success',
    data: {
      user,
    }
  });
});

export const updateUser = catchAsync( async(req:Request, res: Response, next: NextFunction) : Promise<void> =>{

  const doc = await User.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true
  });

  if(!doc) return next(new AppError('No document found with that ID', 404));

  res.status(200).json({
    status:'success',
    data:{
      user: doc
    },
  })
});

export const deleteUser = catchAsync( async(req:Request, res: Response, next: NextFunction) : Promise<void> =>{

  const doc = await User.findByIdAndDelete(req.params.id);

  if(!doc) return next(new AppError('No document found with that ID', 404));

  res.status(204).json({
    status:'success',
    data: null
  })
});


