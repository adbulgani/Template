const mongoose = require("mongoose");
const Template = require("../models/Template.js");

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

async function fetchTheTemplate(templateId) {
  try {
    await connectToDatabase();
    console.log("in fetch db", templateId);
    const template = await Template.findById(templateId);
    console.log("template", template);
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }
    return template;
  } catch (error) {
    console.error("Error fetching template:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Close the MongoDB connection after saving the user
    mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

module.exports = { fetchTheTemplate };
