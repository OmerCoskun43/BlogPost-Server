"use strict";
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
require("express-async-errors");
const dbConnection = require("./configs/dbConnection");

//! ENV Vars
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "127.0.0.1";

//! Clienttan Gelen İstek Bodylerini otomatik parse etmesi için
app.use(express.json());

//! Cors Package ile Cross Origin Resource Sharing
app.use(cors());

//! AUTHENTICATION MIDDLEWARE
app.use(require("./middlewares/authentication"));

//! MAIN PAGE ROUTE
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to my Blog Site",
    user: req.user,
  });
});

//!ROUTING WITH ROUTES
const authRouter = require("./routes/auth.router");
app.use("/auth", authRouter);
const blogRouter = require("./routes/blog.router");
app.use("/blogs", blogRouter);

//! USING ERROR-HANDLER MIDDLEWARE
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);
//! MONGODB CONNECTION
dbConnection();
//! SERVER LISTEN
app.listen(PORT, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
