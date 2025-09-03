// models/fruit.js

// add notes for the steps later.    
const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
  name: String,
  isReadyToEat: Boolean,
});

const Fruit = mongoose.model("Fruit", fruitSchema); // create model

// models/fruit.js

module.exports = Fruit;
