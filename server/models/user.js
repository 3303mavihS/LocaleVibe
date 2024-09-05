import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Ensure the username is unique
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure the email is unique
    },
    password: {
      type: String,
      required: true,
    },
    userPicturePath: {
      type: String,
      default: "",
    },
    my_vibespot: [
      {
        type: Schema.Types.ObjectId,
        ref: "VibeSpot", // Reference to the VibeSpot model
      },
    ],
    been_to_vibespot: [
      {
        type: Schema.Types.ObjectId,
        ref: "VibeSpot", // Reference to the VibeSpot model
      },
    ],
    liked_vibespot: [
      {
        type: Schema.Types.ObjectId,
        ref: "VibeSpot", // Reference to the VibeSpot model
      },
    ],
    friends: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
