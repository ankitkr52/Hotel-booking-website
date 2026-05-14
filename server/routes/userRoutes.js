import express from "express";
import { protect } from "../middleware/authMiddleware";
import { getUsersData } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/",protect,getUsersData);




export default userRouter;