
import express from 'express';

const router = express.Router();

//to link controller
import * as contactController from '../controller/contact.controller.js';
router.post("/send",contactController.save);
 router.get("/fetch",contactController.fetch);
// router.patch("/update",userController.update);
// router.delete("/delete",userController.deleteUser);
//  router.post("/login",donorController.login);
export default router;