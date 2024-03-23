"use strict";

const { mongoose } = require("mongoose");

const MONGODB = process.env.MONGODB;

module.exports = () => {
  mongoose
    .connect(MONGODB)
    .then(() => {
      console.log("** MongoDB connected **");
    })
    .catch(() => {
      console.log("** MongoDB disconnected **");
    });
};
