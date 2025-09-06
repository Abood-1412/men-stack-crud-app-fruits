// Here is where we import modules
// We begin by loading Express
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const methodOverride = require("method-override");
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
app.use(methodOverride("_method"));
app.use(morgan("dev"))


app.get("/", async (req, res) => {
  res.render("index.ejs");
});
// GET /fruit/index.ejs
app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find();
  //console.log(allFruits); // to log to fruits
  res.render("fruits/index.ejs", { fruits: allFruits }
)});

// GET /fruits/new
app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs")
});

app.get("/fruits/:fruitId", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/show.ejs", { fruit: foundFruit });
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
  res.redirect("/fruits"); // changes: removed the new page path.
});
// delete route
app.delete("/fruits/:fruitId", async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect("/fruits");
});
// GET localhost:3000/fruits/:fruitId/edit
app.get("/fruits/:fruitId/edit", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/edit.ejs", {
    fruit: foundFruit,
  });
});
// update route
app.put("/fruits/:fruitId", async (req, res) => {
  // Handle the 'isReadyToEat' checkbox data
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  
  // Update the fruit in the database
  await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);

  // Redirect to the fruit's show page to see the updates
  res.redirect(`/fruits/${req.params.fruitId}`);
});

app.listen(port, () => {
  console.log('Listening on port 3000');
});
