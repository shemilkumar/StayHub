import express from 'express';
import * as userController from "../controllers/userController";
import * as authController from "../controllers/authController";

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/forgotPassword').post(authController.forgotPasswod);
router.route('/resetPassword/:token').post(authController.resetPasswod);

router.route('/updateMyPassword').patch(authController.protect,authController.updatePassword);
router.route('/updateMe').patch(authController.protect,userController.updateMe);

router
  .route('/').get(authController.protect,userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(authController.protect,authController.restrictTo('admin'),userController.deleteUser);

export default router;