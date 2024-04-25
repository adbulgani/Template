var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
const dbConfig = require("./db/db.js");
const templateService = require("./db/templateService.js");
const regService = require("./db/regService.js");
const loginService = require("./db/loginService.js");
const userService = require("./db/userService.js");

var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

var bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.get("/Users", async (req, res) => {
  resp = await userService.getUsers();
  console.log(resp);
  res.setHeader("Content-Type", "application/json");

  res.send(JSON.stringify(resp));
});

app.post("/create", async (req, res) => {
  fields = req.body;
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

app.post("/login", async (req, res) => {
  logFields = req.body;
  console.log(logFields);
  resp = await loginService.loginUser(
    logFields["email"],
    logFields["password"]
  );
  console.log(resp);
  res.sendStatus(200);
});

const PORT = "8080";

app.listen(8080, () => console.log(`Listening at PORT,`, { PORT }));
