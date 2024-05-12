const Template = require("../models/Template");
const mongoose = require("mongoose");
const User = require("../models/User");

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Template");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

async function getTemplatesCreatedBy(userId) {
  try {
    await connectToDatabase();
    const templates = await Template.find({ created_by: userId });
    return templates;
  } catch (error) {
    throw new Error("Error fetching templates created by user: " + error);
  }
}

module.exports = { getTemplatesCreatedBy };
