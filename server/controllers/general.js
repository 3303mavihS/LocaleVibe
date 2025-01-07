/**
 * Controllers or funtions
 */
import User from "../models/user.js";
import VibeSpot from "../models/vibespot.js";
import mongoose from "mongoose";

//get vibespot Info
export const getVibeSpotDetails = async (req, res) => {
  try {
    const { vibespotId } = req.params;
    console.log(vibespotId);
    // Find the vibespot by ID
    const vibespotInfo = await VibeSpot.findById(vibespotId)
      .populate("userId", "username firstName lastName userPicturePath")
      .populate({
        path: "likes",
        select: "username firstName lastName userPicturePath",
      })
      .populate({
        path: "visitedBy",
        select: "username firstName lastName userPicturePath",
      })
      .populate({
        path: "comments.userId",
        select: "username firstName lastName userPicturePath",
      })
      .slice("comments", -98);
    // If the vibespot does not exist, return 404
    if (!vibespotInfo) {
      return res.status(404).json({ error_message: "Vibespot not found" });
    }
    // console.log(vibespotInfo);
    // Return the vibespot info
    res.status(200).json(vibespotInfo);
  } catch (err) {
    // Handle any errors
    return res.status(500).json({ error_message: err.message });
  }
};
