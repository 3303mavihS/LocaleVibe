import express from "express";
import { getUserData } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * read
 * TODO i have to call the functions from user controllers
 */
router.get("/user-data/:userId", verifyToken, getUserData);

/**
 * update
 */
//router.patch("/:params/:params",verifyToken,updateFunction);

export default router;
