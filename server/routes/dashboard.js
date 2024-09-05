import express from "express";
import {
  addVibeSpot,
  getFeedVibeSpot,
  getUserVibeSpot,
  likeVibeSpot,
} from "../controllers/dashboard.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * post routes
 */
router.post("/add-vibespot", verifyToken, addVibeSpot);
/**
 * Read routes
 */
router.get("/", verifyToken, getFeedVibeSpot);
router.get("/my-vibespot/:userId", verifyToken, getUserVibeSpot);
/**
 * Update routes
 */
router.patch("/:id/like", verifyToken, likeVibeSpot);

export default router;
