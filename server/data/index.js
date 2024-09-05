import mongoose from "mongoose";
import User from "../models/user.js";
import VibeSpot from "../models/vibespot.js";

const { ObjectId } = mongoose.Types;

export const users = [
  {
    userId: "user001",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    password: "$2b$10$7XeR7r6lHJ3M/UQVHUIOae9QsGq8le8xV/5gNjk.p8PNJZs89LdIW",
    userPicturePath: "/images/users/user001.jpg",
    my_vibespot: [],
    been_to_vibespot: [],
    liked_vibespot: [],
    friends: ["user002", "user003"],
  },
  {
    userId: "user002",
    firstName: "Jane",
    lastName: "Smith",
    email: "janesmith@example.com",
    password: "$2b$10$K8Ezpl9oE6Htq1.JkPz/EOBv5U.dCZBYuTYJ7CUp0/Onzpp4hyOnO",
    userPicturePath: "/images/users/user002.jpg",
    my_vibespot: [],
    been_to_vibespot: [],
    liked_vibespot: [],
    friends: ["user001", "user004"],
  },
  {
    userId: "user003",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alicejohnson@example.com",
    password: "$2b$10$nXtzffHR4J9D6FhC4uQ56.PuEGk7Zpa8VfUlH9nkh/RXfCqC5xRyC",
    userPicturePath: "/images/users/user003.jpg",
    my_vibespot: [],
    been_to_vibespot: [],
    liked_vibespot: [],
    friends: ["user001", "user005"],
  },
  {
    userId: "user004",
    firstName: "Bob",
    lastName: "Williams",
    email: "bobwilliams@example.com",
    password: "$2b$10$MLc/Ra/R3YBzjPoMrd/ZPuq5GcMK8hxMB5mtZchQm8bh/iw0wCQjy",
    userPicturePath: "/images/users/user004.jpg",
    my_vibespot: [],
    been_to_vibespot: [],
    liked_vibespot: [],
    friends: ["user002", "user006"],
  },
  {
    userId: "user005",
    firstName: "Charlie",
    lastName: "Brown",
    email: "charliebrown@example.com",
    password: "$2b$10$dYJYRc4tJ/NbPUw1OCL5seP4EQbC92VlsmyGcjf.nEKHFXGPrAFxu",
    userPicturePath: "/images/users/user005.jpg",
    my_vibespot: [],
    been_to_vibespot: [],
    liked_vibespot: [],
    friends: ["user003", "user006"],
  },
  {
    userId: "user006",
    firstName: "Dave",
    lastName: "Miller",
    email: "davemiller@example.com",
    password: "$2b$10$gqv2Zx1mJlCJfepKMG2.kOxE1kFufU76gK1SIkdMZ5mfTMe2YN08e",
    userPicturePath: "/images/users/user006.jpg",
    my_vibespot: [],
    been_to_vibespot: [],
    liked_vibespot: [],
    friends: ["user004", "user005"],
  },
];

export const vibespots = [
  {
    _id: "64d31861b506c5dd224fc2d1",
    title: "The Coffee Lounge",
    description: "A cozy spot with great coffee and a relaxed atmosphere.",
    category: "Cafe",
    location: {
      type: "Point",
      coordinates: [-73.935242, 40.73061],
    },
    userId: "64d31861b506c5dd224fc2c1", // User: John Doe
    best_menu: "Latte",
    recommendation: "Try the chocolate croissant with your coffee.",
    vibeSpotImagePath: ["/images/vibespots/coffee_lounge.jpg"],
    likes: ["64d31861b506c5dd224fc2c2"], // Liked by Jane Smith
    comments: [
      {
        userId: "64d31861b506c5dd224fc2c2", // Comment by Jane Smith
        text: "This place is amazing!",
        createdAt: "2024-08-01T12:34:56Z",
      },
    ],
    rating: 4.5,
  },
  {
    _id: "64d31861b506c5dd224fc2d2",
    title: "Pizza Paradise",
    description: "The best pizza in town with a wide variety of toppings.",
    category: "Restaurant",
    location: {
      type: "Point",
      coordinates: [-73.985428, 40.748817],
    },
    userId: "64d31861b506c5dd224fc2c3", // User: Alice Johnson
    best_menu: "Pepperoni Pizza",
    recommendation: "The cheese burst crust is a must-try!",
    vibeSpotImagePath: ["/images/vibespots/pizza_paradise.jpg"],
    likes: ["64d31861b506c5dd224fc2c1"], // Liked by John Doe
    comments: [
      {
        userId: "64d31861b506c5dd224fc2c1", // Comment by John Doe
        text: "Love the pizza here!",
        createdAt: "2024-08-02T14:15:23Z",
      },
    ],
    rating: 4.8,
  },
  {
    _id: "64d31861b506c5dd224fc2d3",
    title: "Sunny's Diner",
    description:
      "A classic diner with a vintage vibe and delicious comfort food.",
    category: "Diner",
    location: {
      type: "Point",
      coordinates: [-74.005941, 40.712776],
    },
    userId: "64d31861b506c5dd224fc2c4", // User: Bob Williams
    best_menu: "Pancakes",
    recommendation: "The blueberry pancakes are the best!",
    vibeSpotImagePath: ["/images/vibespots/sunnys_diner.jpg"],
    likes: ["64d31861b506c5dd224fc2c5"], // Liked by Charlie Brown
    comments: [
      {
        userId: "64d31861b506c5dd224fc2c5", // Comment by Charlie Brown
        text: "Great place for breakfast.",
        createdAt: "2024-08-03T09:45:12Z",
      },
    ],
    rating: 4.3,
  },
  {
    _id: "64d31861b506c5dd224fc2d4",
    title: "The Green Park",
    description:
      "A peaceful park with lots of greenery and a great spot to relax.",
    category: "Park",
    location: {
      type: "Point",
      coordinates: [-74.006, 40.7128],
    },
    userId: "64d31861b506c5dd224fc2c5", // User: Charlie Brown
    best_menu: "",
    recommendation: "Perfect for a morning jog or an evening walk.",
    vibeSpotImagePath: ["/images/vibespots/green_park.jpg"],
    likes: ["64d31861b506c5dd224fc2c6"], // Liked by Dave Miller
    comments: [
      {
        userId: "64d31861b506c5dd224fc2c6", // Comment by Dave Miller
        text: "Beautiful and calming environment.",
        createdAt: "2024-08-04T10:22:34Z",
      },
    ],
    rating: 4.7,
  },
  {
    _id: "64d31861b506c5dd224fc2d5",
    title: "Urban Library",
    description:
      "A modern library with a vast collection of books and quiet study areas.",
    category: "Library",
    location: {
      type: "Point",
      coordinates: [-73.9712, 40.7831],
    },
    userId: "64d31861b506c5dd224fc2c6", // User: Dave Miller
    best_menu: "",
    recommendation: "Check out the new fiction section.",
    vibeSpotImagePath: ["/images/vibespots/urban_library.jpg"],
    likes: ["64d31861b506c5dd224fc2c2"], // Liked by Jane Smith
    comments: [
      {
        userId: "64d31861b506c5dd224fc2c2", // Comment by Jane Smith
        text: "Great place for book lovers.",
        createdAt: "2024-08-05T11:00:00Z",
      },
    ],
    rating: 4.6,
  },
];

const insertData = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://localevibeDBUser:localevibeDBUserPassword@localevibecluster.m18gi.mongodb.net/?retryWrites=true&w=majority&appName=LocaleVibeCluster"
    );

    // // await User.insertMany(users);
    // await VibeSpot.insertMany(vibespots);

    console.log("Data Already inserted successfully");

    mongoose.disconnect();
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

// insertData();
