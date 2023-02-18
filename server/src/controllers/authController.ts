import { Request,Response,NextFunction} from "express";
import User from "../models/userModel";
import catchAsync from "../util/catchAsync";
import jwt from "jsonwebtoken";
import AppError from "../util/AppError";
import { promisify } from "util";

const signToken = (id: string):string => {
  return jwt.sign({id},process.env.JWT_SECRET!,{
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

export const signup = catchAsync( async(req:Request, res: Response, next: NextFunction) : Promise<void> =>{

  const newUser = await User.create(req.body);

  const token = signToken(newUser._id);

  res.status(200).json({
    status:'success',
    token,
    data:{
      user: newUser
    }
  });
});

export const login = catchAsync(async (req:Request,res:Response,next:NextFunction): Promise<void> =>{

  const {email, password} = req.body

  // check user email and password exists
  console.log(email, password);
  if(!email || !password){
    return next(new AppError('Please provide email and password',400));
  }

  // check if user exists and password is correct
  const user = await User.findOne({email}).select('+password');
  if(!user || !(await user.checkPassword(user.password,password))){
    return next(new AppError('Incorrect email and Password',401));
  }

  // id everything ok send token
  const token = signToken(user._id);

  res.status(200).json({
    status:'success',
    token,
  });
}); 

export const protect = catchAsync(async (req:Request,res:Response,next:NextFunction): Promise<void> =>{
  // Getting token and check of if its there
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
  }

  if(!token) return next(new AppError('You are not logged in! Please log in to get access',401));

  // verification token
  // const verify = promisify(jwt.verify);
  // const decoded = await ver(token,process.env.JWT_SECRET!);

  // check if user still exists

  // check if user chenged password after the token was issued


});