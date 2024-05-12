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
async function fetchLatestTemplate() {
  try {
    await connectToDatabase();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of the day
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // End of the day

    const latestTemplate = await Template.find({
      createdAt: {
        $gte: today,
        $lt: endOfDay,
      },
    });

    if (latestTemplate.length > 0) {
      console.log(latestTemplate);
      return JSON.stringify(latestTemplate);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching latest template:", error);
    throw new Error("Error fetching latest template");
  }
}

module.exports = fetchLatestTemplate;
