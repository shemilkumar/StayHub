import { Request,Response,NextFunction } from "express";
import AppError from "../util/AppError";

interface ErrorClass extends Error{
  statusCode: number,
  status: string,
  isOperational: boolean,

  code?: number,
  kind?: string,
  value?: string,
  keyValue?: {[key: string] : string},
  errors?: {[key: string] :  {[key: string] : string}},
}

const sendErrorDev = (err : ErrorClass, res : Response): void => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
}

const sendErrorProd = (err : ErrorClass, res : Response): void => {
  if(err.isOperational){
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  // Programming or other unkwnown error: dont leak error details
  }else{
    console.log('ERROR',err);

    res.status(err.statusCode).json({
      status: 'error',
      message: 'Something went very wrong',
      // error: err,
    });
  }
}

const handleCastErrorDB = (err: ErrorClass) =>{
  const message = `Can not find '${err.value}' as id on the server`;
  return new AppError(message,400);
}

const handleDuplicateFieldsDB = (err: ErrorClass) =>{
  const duplicateValues: string = Object.values(err.keyValue!).join(',');
  const message = `Duplicate field value: ${duplicateValues}. Please use another value`;
  return new AppError(message,400);
}

const handleValidationErrorDB = (err: ErrorClass) =>{
  const errors = Object.values(err.errors!).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message,400);
}

const handleJWTError = (err: ErrorClass) => new AppError('Invalid token, Please login again',401);

const handleJWTExpiredError = (err: ErrorClass) => new AppError('Your token has expired, Please login again',401);

const globalErrorController = (err: ErrorClass, req:Request, res:Response, next:NextFunction) =>{

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if(process.env.NODE_ENV === 'development'){
    sendErrorDev(err,res);
  } 
    

  else if(process.env.NODE_ENV === 'production') {

    let error = {...err};
    // console.log(err);

    if(error.kind === 'ObjectId') error = handleCastErrorDB(error);
    if(err.name === 'ValidationError') error = handleValidationErrorDB(error);
    if(error.code === 11000) error = handleDuplicateFieldsDB(error);

    if(error.name = 'JsonWebTokenError') error = handleJWTError(error);
    if(error.name = 'TokenExpiredError') error = handleJWTExpiredError(error);

    sendErrorProd(error,res);
  }  
};

export default globalErrorController;