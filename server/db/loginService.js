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

async function loginUser(email, password) {
  try {
    // Connect to the MongoDB database
    await connectToDatabase();
    // Find the user by email and password
    const user = await User.findOne({ email, password });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    return user;
  } catch (error) {
    throw error;
  } finally {
    // Close the MongoDB connection after login
    mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

module.exports = { loginUser };
