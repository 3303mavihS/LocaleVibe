import express from "express";
import { getVibeSpotDetails } from "../controllers/general.js";

const router = express.Router();

//get routes
router.get("/vibespot/:vibespotId", getVibeSpotDetails);

//post routes

export default router;
