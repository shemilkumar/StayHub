import express from 'express';
import * as bookingController from "../controllers/bookingController";
import * as authController from "../controllers/authController";

const router = express.Router();

router
  .route('/bookingStats')
  .get(bookingController.getBookingStats);

router
  .route('/myBookings')
  .get(authController.protect,bookingController.getMyBookings);

router
  .route('/')
  .get(authController.restrictTo('admin'),bookingController.getAllBooking)
  .post(authController.protect,bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(authController.protect,authController.restrictTo('admin'),bookingController.updateBooking)
  .delete(authController.protect,bookingController.deleteBooking);

export default router;