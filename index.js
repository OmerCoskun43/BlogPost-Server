"use strict";
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const dbConnection = require("./configs/dbConnection");

//! ENV Vars
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "127.0.0.1";

//! Clienttan Gelen İstek Bodylerini otomatik parse etmesi için
app.use(express.json());

//! Cors Package ile Cross Origin Resource Sharing
app.use(cors());

//! MAIN PAGE ROUTE
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//! MONGODB CONNECTION
dbConnection();
//! SERVER LISTEN
app.listen(PORT, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
