const express = require("express");
const authController = require("../controllers/auth.controller");
const wishController = require("../controllers/wish.controller");
const router = express.Router();

router.post("/", authController.authenticate, wishController.addItemToWish);
router.get("/", authController.authenticate, wishController.getWishItems);
router.delete(
  "/:id",
  authController.authenticate,
  wishController.deleteWishItem
);

module.exports = router;
