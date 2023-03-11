import { NextFunction, Request, Response } from 'express';
import { AuthRequest } from "../controllers/authController";
import catchAsync from '../util/catchAsync';
import AppError from '../util/AppError';
import Razorpay from "razorpay";
import crypto from "crypto";

export const paymentOrder = catchAsync( async(req:AuthRequest, res: Response, next: NextFunction): Promise<void> =>{

  if(!req.user) next(new AppError('Please log in for book home',400));

  const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_SECRET!,
  });

  const options = {
      amount: req.body.price * 100, // amount in smallest currency unit
      currency: "INR",
      receipt: "receipt_order_74394",
  };

  const order = await instance.orders.create(options);

  if (!order) next(new AppError("Some error occured",500));

  res.status(200).json({
    status: 'success',
    order
  });

});

export const paymentVerify = catchAsync( async(req:AuthRequest, res: Response, next: NextFunction): Promise<void> =>{

    // getting the details back from our font-end
    const {
        orderCreationId,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
    } = req.body;

    // Creating our own digest
    // The format should be like this:
    // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET!);

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");

    // comaparing our digest with the actual signature
    if (digest !== razorpaySignature){
      return next(new AppError("Transaction not legit!",400));
    }

    // THE PAYMENT IS LEGIT & VERIFIED
    // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

    res.status(200).json({
        status: "success",
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
    });
});