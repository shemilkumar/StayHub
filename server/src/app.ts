import express,{Request,Response, NextFunction} from 'express';
import morgan from "morgan";

import AppError from './util/AppError';
import homeRouter from './routes/homeRoutes';
import globalErrorController from './controllers/errorController';

const app = express();

// Middlewares
if(process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());


// Routes
app.use('/api/v1/homes/', homeRouter);


// Url not found error handling
app.all('*',(req : Request ,res : Response ,next: NextFunction) =>{
  next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
});
// Global Error handling
app.use(globalErrorController);


export default app;