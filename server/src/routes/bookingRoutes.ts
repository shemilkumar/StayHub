import express from 'express';
import * as bookingController from "../controllers/bookingController";
import * as authController from "../controllers/authController";

const router = express.Router();

// Only logged users get access for these below routes
// router.use(authController.protect);

router
  .route('/myBookings')
  .get(authController.protect,bookingController.getMyBookings);

router
.route('/bookingStats')
.get(authController.protect,bookingController.getBookingStats);

router
  .route('/')
  .post(authController.protect,bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBooking);

// Only admins will get access to these below routes
router.use(authController.restrictTo('admin'));

router
  .route('/').get(bookingController.getAllBooking);

// router
//   .route('/:id')
//   .get(bookingController.getUser)
//   .patch(bookingController.updateUser)
//   .delete(bookingController.deleteUser);

export default router;