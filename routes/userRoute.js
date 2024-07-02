const express = require("express");
const { register, login, profile } = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/profile/:id",protect,profile);
module.exports = router