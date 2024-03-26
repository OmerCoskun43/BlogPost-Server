"use strict";

const mongoose = require("mongoose");
const passwordEncrypt = require("../helpers/passwordEncrypt");

const AuthSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      // validate: (email) =>
      //   email.includes("@") && email.includes(".") && email.length >= 7,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      // validate: {
      //   validator: (password) => password.length >= 3 && password.length <= 6,
      //   message: "Password must be at least 3 characters long",
      // },
      set: (password) => passwordEncrypt(password),
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
    collection: "auths",
  }
);

const Auth = mongoose.model("Auth", AuthSchema);

module.exports = Auth;
