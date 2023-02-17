import express from "express";
import * as homeController from "../controllers/homeController";

const router = express.Router();

router.
  route('/')
  .get(homeController.getAllHomes)
  .post(homeController.createHome);

router
  .route('/:id')
  .get(homeController.getHome)
  .patch(homeController.updateHome)
  .delete(homeController.deleteHome);

export default router;