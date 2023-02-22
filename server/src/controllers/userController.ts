import { NextFunction, Request, Response } from "express";
import User, { UserType } from "../models/userModel";
import AppError from "../util/AppError";
import catchAsync from "../util/catchAsync";
import { AuthRequest } from "../controllers/authController";
import * as factory from "../controllers/handleFactory";


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

export const getMe = catchAsync( async(req:AuthRequest, res: Response, next: NextFunction) : Promise<void> =>{
  req.params.id = req.user?.id;
  next();
});

export const getUser = factory.getOne<UserType>(User);
export const getAllUsers = factory.getAll<UserType>(User);
export const updateUser = factory.updateOne<UserType>(User);
export const deleteUser = factory.deleteOne<UserType>(User);


