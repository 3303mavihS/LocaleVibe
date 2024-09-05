/**
 * Controllers or funtions
 */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

/**
 * register/signup function that takes req,res are params and
 * it will return json of the response
 */
export const signup = async (req, res) => {
  try {
    //getting the attributes or parameter from the request body
    const data_received = req.body;

    const salt = await bcrypt.genSalt();
    data_received.password = await bcrypt.hash(data_received.password, salt);

    const newUser = new User({
      ...data_received,
    });

    const savedUser = await newUser.save();
    //res is product the success status and converting the newUser data into json.
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error_message: err.message });
  }
};

/**
 * login/signin function
 */
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect Password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_SECRET);
    delete user.password;

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error_message: err.message });
  }
};
