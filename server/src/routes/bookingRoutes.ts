import express from 'express';
import * as bookingController from "../controllers/bookingController";
import * as authController from "../controllers/authController";

const router = express.Router();
// Only logged users get access for these below routes
// router.use(authController.protect);

router
  .route('/bookingStats')
  .get(bookingController.getBookingStats);

router
  .route('/myBookings')
  .get(authController.protect,bookingController.getMyBookings);

router
  .route('/')
  .get(bookingController.getAllBooking)
  .post(authController.protect,bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .delete(authController.protect,bookingController.deleteBooking);

// Only admins will get access to these below routes
router.use(authController.restrictTo('admin'));

export default router;