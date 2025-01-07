import mongoose from "mongoose";
import User from "../models/user.js";
import VibeSpot from "../models/vibespot.js";

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
 * toggle Like by User in VibeSpots
 */
export const toggleLikedByVibeSpot = async (req, res) => {
  try {
    const { vibespotId } = req.params;
    const { userId } = req.body;

    // Fetch the user to check if the vibespotId exists in the liked_vibespot array
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error_message: "User not found" });
    }

    const isLiked = user.liked_vibespot.includes(vibespotId);

    if (isLiked) {
      // Remove vibespotId from the liked_vibespot array of the user
      user.liked_vibespot = user.liked_vibespot.filter(
        (id) => id.toString() !== vibespotId
      );

      // Remove userId from the likes array of the VibeSpot
      await VibeSpot.findByIdAndUpdate(
        vibespotId,
        { $pull: { likes: userId } },
        { new: true }
      );
    } else {
      // Add vibespotId to the liked_vibespot array of the user
      user.liked_vibespot.push(vibespotId);

      // Add userId to the likes array of the VibeSpot
      await VibeSpot.findByIdAndUpdate(
        vibespotId,
        { $addToSet: { likes: userId } }, // Ensures no duplicate entries
        { new: true }
      );
    }

    // Save the updated user
    await user.save();

    // Fetch the updated likes list from the VibeSpot
    // Populate 'likes' array to fetch user details after updates
    const updatedVibeSpot = await VibeSpot.findById(vibespotId).populate({
      path: "likes",
      select: "username firstName lastName userPicturePath",
    });

    // Return the updated list of likes with user details
    return res.status(200).json(updatedVibeSpot.likes);
  } catch (err) {
    res.status(404).json({ error_message: err.message });
  }
};
/**
 * toggle Visited by User in VibeSpots
 */
export const toggleVisitedByVibeSpot = async (req, res) => {
  try {
    const { vibespotId } = req.params;
    const { userId } = req.body;

    // Fetch the user to check if the vibespotId exists in the been_to_vibespot array
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error_message: "User not found" });
    }

    const isVisited = user.been_to_vibespot.includes(vibespotId);

    if (isVisited) {
      // Remove vibespotId from the been_to_vibespot array of the user
      user.been_to_vibespot = user.been_to_vibespot.filter(
        (id) => id.toString() !== vibespotId
      );

      // Remove userId from the visited_by array of the VibeSpot
      await VibeSpot.findByIdAndUpdate(
        vibespotId,
        { $pull: { visitedBy: userId } },
        { new: true }
      );
    } else {
      // Add vibespotId to the been_to_vibespot array of the user
      user.been_to_vibespot.push(vibespotId);

      // Add userId to the visited_by array of the VibeSpot
      await VibeSpot.findByIdAndUpdate(
        vibespotId,
        { $addToSet: { visitedBy: userId } }, // Ensures no duplicate entries
        { new: true }
      );
    }

    // Save the updated user
    await user.save();

    // Fetch the updated visited_by list from the VibeSpot
    const updatedVibeSpot = await VibeSpot.findById(vibespotId).populate({
      path: "visitedBy",
      select: "username firstName lastName userPicturePath",
    });

    // Return the updated list of visited_by with user details
    return res.status(200).json(updatedVibeSpot.visitedBy);
  } catch (err) {
    res.status(404).json({ error_message: err.message });
  }
};

//set the vibespot has been visited by the user
export const visitVibeSpot = async (req, res) => {
  try {
    const { vibespotId } = req.params; // Extract vibespotId from request params
    const { userId } = req.body; // Extract userId from request body

    console.log("userId Rec. :", userId);
    console.log("vibespoId Rec. :", vibespotId);

    // Ensure vibespotId is in the correct format
    const vibespot = await VibeSpot.findById(vibespotId.trim());
    if (!vibespot) {
      return res.status(404).json({ error_message: "Vibespot not found" });
    }

    // Find the user by ID
    const user = await User.findById(userId.trim());
    if (!user) {
      return res.status(404).json({ error_message: "User not found" });
    }

    // Initialize visitedBy array if it doesn't exist
    if (!vibespot.visitedBy) {
      vibespot.visitedBy = [];
    }

    // Initialize liked_vibespot array if it doesn't exist
    if (!user.been_to_vibespot) {
      user.been_to_vibespot = [];
    }

    // Check if the user has already liked the vibespot
    const isVisited = vibespot.visitedBy.includes(userId);
    if (isVisited) {
      return res
        .status(401)
        .json({ error_message: "User has already been to this vibespot" });
    }

    // Add userId to vibespot's likes array
    vibespot.visitedBy.push(userId);

    // Add vibespotId to user's liked_vibespot array
    user.been_to_vibespot.push(vibespotId);

    // Save the updated vibespot and user
    await vibespot.save();
    await user.save();

    // Respond with success message
    res.status(200).json({
      message: "Vibespot liked successfully",
      vibespot: vibespot,
      user: user,
    });
  } catch (err) {
    res.status(500).json({ error_message: err.message });
  }
};

//post comment on post.
export const addComment = async (req, res) => {
  try {
    const { vibespotId } = req.params;
    const { userId, comment } = req.body;

    //Find the vibespot By Id
    const vibespot = await VibeSpot.findById(vibespotId);

    // If the vibespot does not exist, return 404
    if (!vibespot) {
      return res.status(404).json({ error_message: "Vibespot not found" });
    }

    // Add the new comment to the comments array
    vibespot.comments.push({
      userId,
      text: comment,
      createdAt: Date.now(),
    });

    // Save the updated vibespot document
    await vibespot.save();

    // Respond with the updated vibespot
    //console.log(vibespot);
    return res.status(200).json(vibespot);
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }
};

//get user feed vibespots
export const getFeedVibeSpot = async (req, res) => {
  try {
    const feedVibeSpots = await VibeSpot.find();
    res.status(200).json(feedVibeSpots);
  } catch (err) {
    res.status(404).json({ error_message: err.message });
  }
};

// get vibespots created by the user
export const getUserVibeSpots = async (req, res) => {
  try {
    const { userId } = req.params;
    const userObjectId = new mongoose.Types.ObjectId(userId);
    console.log(userId);
    const userVibeSpots = await VibeSpot.find({
      userId: userObjectId,
    });
    return res.status(200).json(userVibeSpots);
  } catch (err) {
    return res.status(404).json({ error_message: err.message });
  }
};

// Get the VibeSpots liked by the user
export const getLikedVibeSpots = async (req, res) => {
  try {
    const { userId } = req.params;
    const userObjectId = new mongoose.Types.ObjectId(userId);
    console.log("User ID:", userId);

    // Query VibeSpot collection where the userId exists in the 'likes' array
    const userVibeSpots = await VibeSpot.find({
      likes: userObjectId, // No need to convert userId to ObjectId unless necessary
    });

    return res.status(200).json(userVibeSpots);
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }
};

// Get the VibeSpots visited by the user
export const getVisitedVibeSpots = async (req, res) => {
  try {
    const { userId } = req.params;
    const userObjectId = new mongoose.Types.ObjectId(userId);
    console.log("User ID:", userId);

    // Query VibeSpot collection where the userId exists in the 'visitedBy' array
    const userVibeSpots = await VibeSpot.find({
      visitedBy: userObjectId, // No need to convert userId to ObjectId unless necessary
    });

    return res.status(200).json(userVibeSpots);
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }
};
