import {NextFunction, Request,Response} from 'express';
import Home, { HomeModel } from '../models/homeModel';
import catchAsync from '../util/catchAsync';
import * as factory from "../controllers/handleFactory";


export const aliasTopHomes = catchAsync( async(req:Request, res: Response, next: NextFunction) : Promise<void> =>{
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,address';

  next();
});

export const getHome = factory.getOne<HomeModel>(Home);
export const getAllHomes = factory.getAll<HomeModel>(Home);
export const createHome = factory.createOne<HomeModel>(Home);
export const updateHome = factory.updateOne<HomeModel>(Home);
export const deleteHome = factory.deleteOne<HomeModel>(Home);