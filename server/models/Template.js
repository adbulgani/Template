const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const templateSchema = new Schema({
  templateName: {
    type: String,
    required: true,
  },
  fields: {
    type: [
      {
        name: { type: String, required: true },
        type: {
          type: String,
          required: true,
          enum: ["text", "number", "date"],
        },
        func: {
          type: String,
          enum: ["sum", "avg", "both", "none"],
        },
      },
    ],
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  assigned_To: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
}); // Add timestamps option here

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
