"use strict";
const router = require("express").Router();
const { login, register, logout } = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
