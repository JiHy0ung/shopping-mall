const express = require("express");
const orderController = require("../controllers/order.controller");
const authController = require("../controllers/auth.controller");
const router = express.Router();

router.post("/", authController.authenticate, orderController.createOrder);
router.get("/", authController.authenticate, orderController.getOrder);
router.get("/all", authController.authenticate, orderController.getOrderList);
router.put("/:id", authController.authenticate, orderController.updateOrder);

module.exports = router;
