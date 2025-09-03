// Here is where we import modules
// We begin by loading Express
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const morgan = require('morgan');
const port = 3000;
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
// Import the Fruit model
const Fruit = require("./models/fruit.js");
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"))

// server.js
/*
app.get("/", async (req, res) => {
    res.send("Hi Abdulla")
})
 */   
// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
});
// GET /fruits
app.get("/fruits", (req, res) => {
  res.send("Welcome to the index page!");
});

// GET /fruits/new
app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs")
});

// POST /fruits
app.post("/fruits", async (req, res) => {
  //console.log(req.body);
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  await Fruit.create(req.body);
  res.redirect("/fruits/new");
});

app.listen(port, () => {
  console.log('Listening on port 3000');
});
