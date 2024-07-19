const express = require('express');
const userRouter = express.Router();
const userController = require("../controllers/userControllers");
const { hasToken } = require("../middleware/isAuthenticate");


userRouter.post("/", userController.createUser);
userRouter.get("", hasToken, userController.getUser);
userRouter.put("", hasToken, userController.updateUser);
userRouter.delete("", hasToken, userController.deleteUser);

module.exports  = userRouter;
