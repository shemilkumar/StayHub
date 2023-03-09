import express from 'express';
import * as bookingController from "../controllers/bookingController";
import * as authController from "../controllers/authController";

const router = express.Router();

// Only logged users get access for these below routes
router.use(authController.protect);

router
  .route('/')
  .post(bookingController.createBooking);
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