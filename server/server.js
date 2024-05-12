var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
const dbConfig = require("./db/db.js");
const templateService = require("./db/templateService.js");
const regService = require("./db/regService.js");
const loginService = require("./db/loginService.js");
const userService = require("./db/userService.js");
const Template = require("./models/Template.js");
var bodyParser = require("body-parser");
const User = require("./models/User.js");
const fetchLatestTemplate = require("./db/latestTemplate.js");
const templateCreatedBy = require("./db/templateCreatedBy.js");
const templateAssignedTo = require("./db/templateAssignedTo.js");
const fetchTemplate = require("./db/fetchTemplate.js");

var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.get("/:templateId", async (req, res) => {
  const { templateId } = req.params;
  try {
    console.log(templateId);
    const template = await fetchTemplate.fetchTheTemplate(templateId);
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }
    res.json(template);
  } catch (error) {
    console.error("Error fetching template:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to fetch templates created by the logged-in user
app.get("/my-templates/created-by/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const templatesCreatedByUser =
      await templateCreatedBy.getTemplatesCreatedBy(userId);
    res.json(templatesCreatedByUser);
  } catch (error) {
    console.error("Error fetching templates created by user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to fetch templates assigned to the logged-in user
app.get("/my-templates/assigned-to/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const templatesAssignedToUser =
      await templateAssignedTo.getTemplatesAssignedTo(userId);
    res.json(templatesAssignedToUser);
  } catch (error) {
    console.error("Error fetching templates assigned to user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/latest-template", async (req, res) => {
  const template = await fetchLatestTemplate();
  if (template) {
    console.log(template);
    res.send(JSON.stringify(template));
  } else {
    res.send(null);
  }
});

app.get("/Users", async (req, res) => {
  resp = await userService.getUsers();
  console.log(resp);
  res.setHeader("Content-Type", "application/json");

  res.send(JSON.stringify(resp));
});

app.post("/create", async (req, res) => {
  fields = req.body;
  console.log(fields);
  resp = await templateService.storeTemplate(fields);
  console.log(resp);
  res.sendStatus(200);
});

app.post("/register", async (req, res) => {
  regFields = req.body;
  console.log(regFields);
  resp = await regService.registerUser(regFields);
  console.log(resp);
  res.sendStatus(200);
});

app.get("/login", async (req, res) => {
  const { email, password } = req.query; // Extract email and password from query parameters
  try {
    const loggedUser = await loginService.loginUser(email, password);
    /* console.log(loggedUser); */
    res.json(loggedUser); // Return loggedUser as JSON response
  } catch (error) {
    res.status(400).json({ message: "Invalid email or password" }); // Send error response if login fails
  }
});

const PORT = "8080";

app.listen(8080, () => console.log(`Listening at PORT,`, { PORT }));
