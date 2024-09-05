import User from "../models/user.js";
import VibeSpot from "../models/vibespot.js";
import mongoose from "mongoose";

/**
 * addVibeSpot
 */
export const addVibeSpot = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      lat, // Should be { lat, long }
      long, // Should be { lat, long }
      userId, // The user who posted it
      best_menu,
      recommendation,
      vibeSpotImagePath,
      rating,
    } = req.body;

    // Ensure mongoose is imported and properly accessing ObjectId
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ error_message: "Invalid userId format" });
    }
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const locationData = {
      type: "Point",
      coordinates: [parseFloat(long), parseFloat(lat)], // Ensure these are numbers
    };

    const newVibeSpot = new VibeSpot({
      title,
      description,
      category,
      location: locationData,
      userId: userObjectId,
      best_menu,
      recommendation,
      vibeSpotImagePath: vibeSpotImagePath || [],
      rating: rating || 0,
      likes: [],
      comments: [],
    });

    const added_VibeSpot = await newVibeSpot.save();
    await User.findByIdAndUpdate(userId, {
      $push: { my_vibespot: added_VibeSpot._id },
    });
    //const vibespots = await VibeSpot.find();
    res.status(201).json(added_VibeSpot);
  } catch (err) {
    res.status(409).json({ error_message: err.message });
  }
};
export const uploadVibeSpot = async (req, res) => {
  try {
    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error_message: "No files uploaded" });
    }

    // Extract file paths from the uploaded files
    const imagePaths = req.files.map((file) => {
      const relativePath = file.path.split("uploads/")[1]; // Remove everything before 'uploads/'
      return `uploads/${relativePath}`; // Return only the path after 'uploads/'
    });
    // Return the array of image paths
    res.status(200).json({ imagePaths });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error_message: "Server Error: " + err.message });
  }
};

/**
 * Read VibeSpots
 */
export const getFeedVibeSpot = async (req, res) => {
  try {
    const feedVibeSpots = await VibeSpot.find();
    res.status(200).json(feedVibeSpots);
  } catch (err) {
    res.status(404).json({ error_message: err.message });
  }
};

export const getUserVibeSpot = async (req, res) => {
  try {
    const { userId } = req.params;
    const userObjectId = new mongoose.Types.ObjectId(userId);
    console.log(userId);
    const userVibeSpots = await VibeSpot.find({
      userId: userObjectId,
    });
    res.status(201).json(userVibeSpots);
  } catch (err) {
    res.status(404).json({ error_message: err.message });
  }
};

/**
 * Updates in VibeSpots
 */
export const likeVibeSpot = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const likedVibeSpot = await VibeSpot.findById(id);
    const isLiked = likedVibeSpot.likes.get(userId);

    if (isLiked) {
      likedVibeSpot.likes.delete(userId);
    } else {
      likedVibeSpot.likes.set(userId, true);
    }

    const updateVibeSpotLikes = await VibeSpot.findByIdAndUpdate(
      id,
      { likes: likedVibeSpot.likes },
      { new: true }
    );

    res.status(200).json(updateVibeSpotLikes);
  } catch (err) {
    res.status(404).json({ error_message: err.message });
  }
};

/**
 * TODO
 * to be implemented
 */
//implement explore VibeSpot
//implement liked VibeSpot
// getExploreVibeSpot /**get the response of the search  */,
// getLikedVibeSpots /**get the response of the vibespots list liked by user. */,
