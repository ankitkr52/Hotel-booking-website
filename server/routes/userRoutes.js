import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getUsersData, storeRecentSearchedCities } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/",protect,getUsersData);
userRouter.post("/store-recent-search",protect,storeRecentSearchedCities);




export default userRouter;