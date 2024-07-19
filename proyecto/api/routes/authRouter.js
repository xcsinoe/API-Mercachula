const express = require('express');
const authRouter = express.Router();
const authController = require("../controllers/authControllers");


authRouter.post("/login", authController.login);

module.exports = authRouter;
