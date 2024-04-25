// userController.js

const mongoose = require("mongoose");
const User = require("../models/User");

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Template", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

async function getUsers() {
  try {
    // Connect to the MongoDB database
    await connectToDatabase();
    // Fetch all users from the database
    const users = await User.find({}, "userId email");
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  } finally {
    // Close the MongoDB connection after fetching users
    mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

module.exports = { getUsers };
