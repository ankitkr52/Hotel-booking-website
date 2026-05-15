import express from "express";
import { protect } from "../middleware/authMiddleware";
import { getUsersData } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/",protect,getUsersData);
userRouter.post("/store-recent-search",protect,storeRecentSearchedCities);




export default userRouter;