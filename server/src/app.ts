import express,{Request,Response, NextFunction} from 'express';
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from 'compression';
// import xss from "xss-clean";

import AppError from './util/AppError';
import homeRouter from './routes/homeRoutes';
import userRouter from './routes/userRoutes';
import bookingRouter from './routes/bookingRoutes';
import paymentRouter from './routes/paymentRoutes';
import globalErrorController from './controllers/errorController';

const app = express();


///////////////////////////////////////////////////////////////////////////////////////
//  1) Blobal Middlewares

  // Implement Cors
app.use(cors({}));
app.options('*', cors());
// if(process.env.NODE_ENV === 'development'){
//   app.use(cors({}));
//   app.options('*', cors());
// }

  // Set security HTTP header
app.use(helmet({
crossOriginEmbedderPolicy: false,
crossOriginResourcePolicy: false,
}));

  // Development logging
if(process.env.NODE_ENV === 'development') app.use(morgan('dev'));

  // Limit requests from same API
const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: 'To many requests from this IP, Please try again in an hour'
});
app.use('/api', limiter);

  // Body parser, reading data from body into req.body
app.use(express.json({ limit: '1 Mb'}));

  // Cookie parser
app.use(cookieParser());

  // Data sanitization against NoSQL query injection
app.use(mongoSanitize());

  // Data sanitization against XSS
// app.use(xss());

  // Prevent parameter pollution
app.use(hpp({
  whitelist: ['ratingsAverage', 'maxGuests', 'price']
}));

  // Compression
app.use(compression());

  // Serving static files
app.use('/public',express.static(`${__dirname}/public`));


/////////////////////////////////////////////////////////////////////////////////////////

// Routes
app.use('/api/v1/homes', homeRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/booking', bookingRouter);
app.use('/api/v1/payment', paymentRouter);


// Url not found error handling
app.all('*',(req : Request ,res : Response ,next: NextFunction) =>{
  next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
});
// Global Error handling
app.use(globalErrorController);

export default app;