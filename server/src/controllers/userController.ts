import multer, { FileFilterCallback } from "multer";
import { NextFunction, Request, Response } from "express";
import sharp from "sharp";
import AppError from "../util/AppError";
import catchAsync from "../util/catchAsync";
import * as factory from "../controllers/handleFactory";

import User, { UserType } from "../models/userModel";
import { AuthRequest } from "../controllers/authController";

// const multerStorage = multer.diskStorage({
//   destination: (req : Request,file : Express.Multer.File,cb : Callback) =>{
//     cb(null, 'src/public/img/users');
//   },
//   filename:(req : AuthRequest,file : Express.Multer.File,cb : Callback) =>{
//     const extension = file.mimetype.split('/')[1];

//     if(!req.user){
//       cb(new AppError('Please login',401), false);
//       return;
//     }

//     const filename = `user-${req.user.id}-${Date.now()}.${extension}`;
//     cb(null, filename);
//   }
// });

const multerStorage = multer.memoryStorage(); 

const multerFilter = (req : Request,file : Express.Multer.File ,cb : FileFilterCallback) =>{

  // console.log("fileee ===>",req.file);
  if(file.mimetype.startsWith('image')) cb(null,true);
  else {
    new AppError('Not an image! Please upload only images', 400);
    cb(null, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter : multerFilter,
});

export const uploadUserPhoto = upload.single('photo');

export const resizePhoto = (req:AuthRequest, res: Response, next: NextFunction) =>{

  if(!req.file) return next();
  if(!req.user) return next(new AppError('Login error',400));

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500,500)
    .toFormat('jpeg')
    .jpeg({quality : 90})
    .toFile(`src/public/img/users/${req.file.filename}`);

  next();
};


const filterObj = (obj : {[key:string]: any}, ...allowedFields: string[]): any =>{
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
  if(req.file) filteredBody.photo = req.file.filename;

  console.log(req.body);

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


