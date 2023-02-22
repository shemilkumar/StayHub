import express from "express";
import * as homeController from "../controllers/homeController";
import * as authController from "../controllers/authController";

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(homeController.aliasTopHomes,homeController.getAllHomes)

router
  .route('/')
  .get(homeController.getAllHomes)
  .post(authController.protect,authController.restrictTo('admin'),homeController.createHome);

router
  .route('/:id')
  .get(homeController.getHome)
  .patch(authController.protect,authController.restrictTo('admin'),homeController.updateHome)
  .delete(authController.protect,authController.restrictTo('admin'),homeController.deleteHome);

export default router;