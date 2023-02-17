import { Request,Response,NextFunction } from "express";

interface ErrorClass extends Error{
  statusCode: number;
  status: string;
  isOperational: boolean;
}

const globalErrorController = (err: ErrorClass, req:Request, res:Response, next:NextFunction) =>{

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};

export default globalErrorController;