import User from "../models/user.js";
import mongoose from "mongoose";

export const uploadUserImage = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error_message: "No file uploaded" });
    }

    // Extract the file path and format it properly
    const imagePath = req.file.path.split("uploads/")[1]; // Extract the relative path

    // Update the user's profile with the image path
    const updateUserData = await User.findByIdAndUpdate(
      userId,
      { userPicturePath: imagePath }, // Update the 'profilePicture' field in the user document
      { new: true, runValidators: true }
    );

    // If no user is found, return an error
    if (!updateUserData) {
      return res.status(404).json({ error_message: "User not found" });
    }

    // Respond with the updated user data
    res.status(200).json(updateUserData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error_message: err.message });
  }
};

export const getUserData = async (req, res) => {
  try {
    const { userId } = req.params;
    // console.log(userId);

    // Validate that userId is a valid MongoDB ObjectId
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ error_message: "Invalid user ID format." });
    }

    // Fetch user from the database
    const user = await User.findById(userId);

    // If user doesn't exist, return a 404
    if (!user) {
      return res.status(404).json({ error_message: "User not found." });
    }

    // console.log(user);
    res.status(200).json(user);
  } catch (err) {
    // Log the error for debugging
    console.error("Error fetching user data:", err);

    // Return a 500 error if something went wrong on the server
    res.status(500).json({ error_message: "Server error." });
  }
};

//TODO
//get user friends
//haven't implemented the routes yet
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    //TODO
    //i have to give response in formatted in json.
  } catch (err) {
    res.status(404).json({ error_message: err.error_message });
  }
};
