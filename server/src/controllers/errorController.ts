import { Request,Response,NextFunction } from "express";
import AppError from "../util/AppError";

interface ErrorClass extends Error{
  statusCode: number;
  status: string;
  isOperational: boolean;

  code?: number;
}

const sendErrorDev = (err : ErrorClass, res : Response): void => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
}

// const handleCastErrorDB = (err: ErrorClass) =>{
//   const message = `Duplicate field ${err.keyValue}`;
//   return new AppError(message,400);
// }

const sendErrorProd = (err : ErrorClass, res : Response): void => {
  if(err.isOperational){
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

  // Programming or other unkwnown error: dont leak error details
  }else{
    console.log('Error',err);

    res.status(err.statusCode).json({
      status: 'error',
      message: 'Something went very wrong',
      error: err,
    });
  }
}

const globalErrorController = (err: ErrorClass, req:Request, res:Response, next:NextFunction) =>{

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if(process.env.NODE_ENV === 'development') sendErrorDev(err,res);
  else if(process.env.NODE_ENV === 'production') {
    let error = {...err};
    console.log(err);
    // if(error.code === 11000) error = handleCastErrorDB(err);

    sendErrorProd(err,res);
  }
  
};

export default globalErrorController;