import express from "express";
import {
  checkDuplicateEmail,
  checkValidUsername,
  getUserData,
  updateUserProfile,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * read
 * TODO i have to call the functions from user controllers
 */
router.get("/check-username", checkValidUsername);
router.get("/check-email", checkDuplicateEmail);
router.get("/user-data/:userId", verifyToken, getUserData);

/**
 * update
 */
router.post("/profile-setting/:userId", verifyToken, updateUserProfile);

export default router;
