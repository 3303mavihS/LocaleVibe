import express from "express";
import {
  checkValidUsername,
  checkDuplicateEmail,
  updateUserProfile,
  getVibeSpot,
  addComment,
  likeVibeSpot,
  visitVibeSpot,
} from "../controllers/general.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//get routes
router.get("/check-username", checkValidUsername);
router.get("/check-email", checkDuplicateEmail);
router.get("/vibespot/:vibespotId", getVibeSpot);

//post routes
router.post("/profile-setting/:userId", verifyToken, updateUserProfile);
router.post("/post-comment/:vibespotId", verifyToken, addComment);
router.post("/like-vibespot/:vibespotId", verifyToken, likeVibeSpot);
router.post("/visit-vibespot/:vibespotId", verifyToken, visitVibeSpot);

export default router;
