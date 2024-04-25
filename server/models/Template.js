const mongoose = require("mongoose");

// Define the schema for the Fields model
const fieldsSchema = new mongoose.Schema({
  fields: {
    type: [
      {
        name: { type: String, required: true },
        type: {
          type: String,
          required: true,
          enum: ["text", "number", "date"],
        },
      },
    ],
    required: true,
  },
});

// Create the Fields model using the schema
const Fields = mongoose.model("Fields", fieldsSchema);

module.exports = Fields;
