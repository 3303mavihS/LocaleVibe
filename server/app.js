import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import generalRoutes from "./routes/general.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import dashboardRoutes from "./routes/dashboard.js";
import { fileURLToPath } from "url";
import fs from "fs";
import crypto from "crypto";
import { verifyToken } from "./middleware/auth.js";
import { uploadUserImage } from "./controllers/user.js";
import { uploadVibeSpot } from "./controllers/dashboard.js";

/**
 * Configuration for the express files
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "32mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "32mb", extended: true }));
app.use(cors());

//making sure server serves /uploads folder as static resource
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);

/**
 * File Storage
 */
// Function to generate unique folder names
const generateUniqueFolderName = () => {
  return crypto.randomBytes(8).toString("hex"); // Generates a random hash
};
//**VibeSpot */
// Function to handle the Storage process setting
const vibespotImageStorage = multer.diskStorage({
  /**
   * Here we are specifying the destination
   */
  destination: function (req, file, cb) {
    // Check if the folder name is already generated for this request
    if (!req.uploadFolder) {
      // Generate a random folder name once per request
      const folderName = generateUniqueFolderName();

      // Create the upload path inside 'public/uploads/vibespot'
      const uploadPath = path.join(
        __dirname,
        "/public/uploads/vibespot",
        folderName
      );

      // Create the folder if it doesn't exist
      fs.mkdirSync(uploadPath, { recursive: true });

      // Save the folder name and path in the request object to access it later
      req.uploadFolder = uploadPath;
    }

    // Path where images will be saved for this request
    cb(null, req.uploadFolder);
  },
  /**
   * Here we are specifying the setting for the file
   */
  filename: function (req, file, cb) {
    //creating a suffix to add to the file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const vibespotUpload = multer({
  storage: vibespotImageStorage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

//**User ProfilePicture */
// Function to handle the Storage process setting
const userImageStorage = multer.diskStorage({
  /**
   * Here we are specifying the destination
   */
  destination: function (req, file, cb) {
    //generated folder name
    const folderName = generateUniqueFolderName();
    //creating upload path
    const uploadPath = path.join(__dirname, "/public/uploads/user", folderName);

    // Create the folder if it doesn't exist
    fs.mkdirSync(uploadPath, { recursive: true });

    // Save the folder name in the request object to access it later
    req.uploadFolder = folderName;
    // Path where images will be saved
    cb(null, uploadPath);
  },
  /**
   * Here we are specifying the setting for the file
   */
  filename: function (req, file, cb) {
    //creating a suffix to add to the file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const userUpload = multer({
  storage: userImageStorage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

/**
 * Routes with files upload here because we need upload var here.
 */
/**
 * here post request is made to the route or url
 * with token received in bearer
 * then upload.array will do this req 4 times
 * and it will call the function
 * that is being allowed to run because verifyToken
 * have allowed it with next
 * that is returning file paths
 */
//for user profile pic upload
app.post(
  "/profile-setting/upload/:userId",
  verifyToken,
  userUpload.single("user-image"),
  uploadUserImage
);
//for vibespot image upload
app.post(
  "/uploads/vibespot",
  verifyToken,
  vibespotUpload.array("vibespot-image", 4),
  uploadVibeSpot
);

/**
 * Routes are written in separate file and we are calling or using here.
 */
app.use("/", generalRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/dashboard", dashboardRoutes);

/**
 * Mongoose Setup
 */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port : ${PORT}`));
    // User.insertMany(users);
    // VibeSpot.insertMany(vibespots);
  })
  .catch((error) => console.log(`${error} did not connect`));
