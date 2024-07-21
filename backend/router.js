import express from "express";
import {creatingUserHandler,loginUserController} from "./controller/userController.js"

const router = express.Router();

router.post("/sign_up",creatingUserHandler);
router.post("/login",loginUserController)

export {router as routes}