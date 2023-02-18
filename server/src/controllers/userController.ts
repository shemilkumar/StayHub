import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import catchAsync from "../util/catchAsync";

catchAsync( async(req:Request, res: Response, next: NextFunction) : Promise<void> =>{

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

  const user = User.findOne({_id : req.params.id});

  
  res.status(200).json({
    status: 'success',
    data: {
      user,
    }
  });
});

export const updateUser = catchAsync( async(req:Request, res: Response, next: NextFunction) : Promise<void> =>{

  const updatedUser = User.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true
  });

  res.status(200).json({
    status:'success',
    updatedUser,
  })
});

export const deleteUser = catchAsync( async(req:Request, res: Response, next: NextFunction) : Promise<void> =>{

  // const updatedUser = User.findByIdAndUpdate(req.params.id,req.body,{
  //   new:true,
  //   runValidators:true
  // });

  res.status(200).json({
    status:'success',
    // updatedUser,
  })
});
