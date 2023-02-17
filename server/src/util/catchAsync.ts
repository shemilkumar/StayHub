import { Request,Response,NextFunction } from "express";

const catchAsync = <T>(fn: (req:Request, res:Response, next:NextFunction) => Promise<T>) => {
  return (req:Request, res:Response, next:NextFunction) => {
    fn(req,res,next).catch(next);
  }
}

export default catchAsync;
