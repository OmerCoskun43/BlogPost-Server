"use strict";
const router = require("express").Router();
const {
  login,
  register,
  logout,
  list,
  updateOne,
} = require("../controllers/auth.controller");

router.get("/", list);
router.put("/:id", updateOne);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
