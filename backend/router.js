import express from "express";
import {creatingUserHandler,loginUserController} from "./controller/userController.js"
import {retrivingAllBlogs,retrivingBlogsByIntersts,retrivingBlogById} from "./controller/blogController.js"

const router = express.Router();

router.post("/sign_up",creatingUserHandler);
router.post("/login",loginUserController)


// blog Routes
import {creatingBlogHandler} from "./controller/blogController.js"
router.post("/blog",creatingBlogHandler);
router.get("/allBlogs",retrivingAllBlogs);
router.post("/myIntrestsBlogs",retrivingBlogsByIntersts);
router.get("blog/:id",retrivingBlogById);


export {router as routes}