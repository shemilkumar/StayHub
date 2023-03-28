import express from 'express';
import * as paymentController from "../controllers/paymentController";
import * as authController from "../controllers/authController";

const router = express.Router();

router
  .route('/order')
  .post(authController.protect,paymentController.paymentOrder);

router
  .route('/verify')
  .post(authController.protect,paymentController.paymentVerify);

export default router;