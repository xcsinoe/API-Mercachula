const express = require('express');
const commerceRouter = express.Router();
const commerceController = require("../controllers/commerceControllers");
const { hasToken } = require("../middleware/isAuthenticate");
const { formData } = require("../middleware/formData");


commerceRouter.get("/all", commerceController.getCommercesGeneral);
commerceRouter.post("", hasToken, formData, commerceController.createCommerce);
commerceRouter.get("/:commerce_id", hasToken, commerceController.getCommerce);
commerceRouter.get("/", hasToken, commerceController.getCommerces);
commerceRouter.delete("/:commerce_id", hasToken, commerceController.deleteCommerce);
commerceRouter.put("/:commerce_id", hasToken, formData, commerceController.updateCommerce);

module.exports = commerceRouter;
