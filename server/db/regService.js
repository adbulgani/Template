const mongoose = require("mongoose");
const User = require("../models/User.js");

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

async function registerUser(userData) {
  try {
    // Connect to the MongoDB database
    await connectToDatabase();
    // Create a new User document using the provided userData
    const data = {
      email: userData["email"],
      contact: userData["contact"],
      password: userData["password"],
    };
    const newUser = new User(data);
    // Save the new user to the database
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw error;
  } finally {
    // Close the MongoDB connection after saving the user
    mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

module.exports = { registerUser };
