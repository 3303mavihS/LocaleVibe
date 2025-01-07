import express from "express";
import {
  addComment,
  addVibeSpot,
  getFeedVibeSpot,
  getLikedVibeSpots,
  getUserVibeSpots,
  getVisitedVibeSpots,
  toggleLikedByVibeSpot,
  toggleVisitedByVibeSpot,
} from "../controllers/dashboard.js";
import { verifyToken } from "../middleware/auth.js";

/**
 * Routes that requires to login and verifyToken
 */
const router = express.Router();

/**
 * post routes
 */
router.post("/add-vibespot", verifyToken, addVibeSpot);
router.post("/post-comment/:vibespotId", verifyToken, addComment);
router.post("/like-vibespot/:vibespotId", verifyToken, toggleLikedByVibeSpot);
router.post(
  "/visit-vibespot/:vibespotId",
  verifyToken,
  toggleVisitedByVibeSpot
);
/**
 * Read routes
 */
router.get("/user-feed/:userId", verifyToken, getFeedVibeSpot);
router.get("/user-vibespots/:userId", verifyToken, getUserVibeSpots);
router.get("/liked-vibespots/:userId", verifyToken, getLikedVibeSpots);
router.get("/visited-vibespots/:userId", verifyToken, getVisitedVibeSpots);

export default router;
