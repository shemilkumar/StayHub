import express from 'express';
import * as userController from "../controllers/userController";
import * as authController from "../controllers/authController";

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/forgotPassword').post(authController.forgotPasswod);
router.route('/resetPassword/:token').post(authController.resetPasswod);

// Only logged users get access for these below routes
router.use(authController.protect);

router.route('/me').get(userController.getMe,userController.getUser);
router.route('/updateMe').patch(userController.uploadUserPhoto, userController.updateMe);
router.route('/deleteMe').delete(userController.deleteMe);

router.route('/updateMyPassword').patch(authController.updatePassword);

// Only admins will get access to these below routes
router.use(authController.restrictTo('admin'));

router
  .route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default router;