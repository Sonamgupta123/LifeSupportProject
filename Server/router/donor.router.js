
import express from 'express';

const router = express.Router();

//to link controller
import * as donorController from '../controller/donor.controller.js';
router.post("/register",donorController.save);
 router.get("/fetch",donorController.fetch);
 router.patch("/update",donorController.update);
 router.delete("/delete",donorController.deletedonor);
 router.post("/login",donorController.login);
export default router;