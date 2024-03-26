"use strict";

const Auth = require("../models/auth.model");
const emailControl = require("../helpers/emailControl");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  register: async (req, res) => {
    const { username, email, password } = req.body;

    const user = await Auth.findOne({ email, username, password });

    if (user) {
      res.errorStatusCode = 401;
      throw new Error("User already exists");
    }

    if (username && email && password) {
      if (password.length > 6 || password.length < 3) {
        res.errorStatusCode = 400;
        throw new Error(
          "Password must be at least 3 and at most 6 characters long"
        );
      }

      if (!emailControl(email)) {
        res.errorStatusCode = 400;
        throw new Error("Email is not valid");
      }

      const auth = new Auth({ username, email, password });
      const newUser = await auth.save();

      const jwtToken = jwt.sign({ id: newUser._id }, SECRET_KEY, {
        expiresIn: "1h",
      });

      res.status(200).send({
        error: false,
        JWT: jwtToken,
        message: "User Created Successfully",
        user: newUser,
      });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await Auth.findOne({ email });

    if (!user) {
      res.errorStatusCode = 401;
      throw new Error("User does not exist");
    }

    if (!(user.password == passwordEncrypt(password))) {
      res.errorStatusCode = 401;
      throw new Error("Password is not correct");
    }

    const jwtToken = jwt.sign({ id: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).send({
      error: false,
      message: "User Logged In Successfully",
      JWT: jwtToken,
      user: user,
    });
  },

  list: async (req, res) => {
    const auths = await Auth.find().sort({ createdAt: -1 });
    res.send({
      error: false,
      message: "Auth List",
      auths: auths,
    });
  },

  updateOne: async (req, res) => {
    const upDateOne = await Auth.updateOne({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.send({
      error: false,
      message: "User updated successfully",
      user: upDateOne,
    });
  },

  logout: async (req, res) => {
    if (!req.headers.authorization) {
      res.errorStatusCode = 500;
      throw new Error("User Not Logged In");
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      res.errorStatusCode = 500;
      throw new Error("User Not Logged In");
    }

    res.status(200).send({
      error: false,
      message: "User Logged Out Successfully",
    });
  },
};
