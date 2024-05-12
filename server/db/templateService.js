const mongoose = require("mongoose");
const Template = require("../models/Template.js");

async function storeTemplate(fields) {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/Template", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    console.log(fields);

    //Create a new document using the Template model
    const template = new Template(fields);

    // Save the document to the 'template' collection
    await template.save();

    console.log("Template stored successfully");
  } catch (error) {
    console.error("Error storing template:", error);
  } finally {
    // Close the MongoDB connection
    mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

module.exports = { storeTemplate };
