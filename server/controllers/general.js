/**
 * Controllers or funtions
 */
import User from "../models/user.js";
import VibeSpot from "../models/vibespot.js";

// check the valid username
export const checkValidUsername = async (req, res) => {
  try {
    const { username } = req.query;
    const usernameExist = await User.findOne({ username: username });
    if (usernameExist) {
      console.log("username already exist");
      return res.json({ isAvailable: false });
    } else {
      console.log("username available");
      return res.json({ isAvailable: true });
    }
  } catch (err) {
    res.status(500).json({ error_message: err.message });
  }
};

//check the duplicate email address
export const checkDuplicateEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const emailExist = await User.findOne({ email: email });
    if (!emailExist) {
      console.log("email already exist");
      return res.json({ isDuplicate: false });
    } else {
      console.log("new email");
      return res.json({ isDuplicate: true });
    }
  } catch (err) {
    res.status(500).json({ error_message: err.message });
  }
};

//update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedData = req.body;
    console.log("request received");
    // Update the user in the database
    const updateUserData = await User.findByIdAndUpdate(
      userId,
      updatedData, // The fields to update
      { new: true, runValidators: true } // Return the updated user and run any validators
    );
    // Respond with the updated user data
    res.status(200).json(updateUserData);
  } catch (err) {
    res.status(500).json({ error_message: err.message });
  }
};

//get vibespot Info
export const getVibeSpot = async (req, res) => {
  try {
    const { vibespotId } = req.params;

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

//like post and return list
export const likeVibeSpot = async (req, res) => {
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

    // Initialize likes array if it doesn't exist
    if (!vibespot.likes) {
      vibespot.likes = [];
    }

    // Initialize liked_vibespot array if it doesn't exist
    if (!user.liked_vibespot) {
      user.liked_vibespot = [];
    }

    // Check if the user has already liked the vibespot
    const isLiked = vibespot.likes.includes(userId);
    if (isLiked) {
      return res
        .status(401)
        .json({ error_message: "User has already liked this vibespot" });
    }

    // Add userId to vibespot's likes array
    vibespot.likes.push(userId);

    // Add vibespotId to user's liked_vibespot array
    user.liked_vibespot.push(vibespotId);

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
