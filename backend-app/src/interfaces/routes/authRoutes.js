const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/authorizeMiddleware");

router.post("/register", register);
router.post("/login", login);


router.get("/profile", authenticate, (req, res) => {
  res.json({ message: "Welcome to your profile", user: req.user });
});

router.get("/admin", authenticate, authorize(["admin"]), (req, res) => {
  res.json({ message: "Welcome, admin", user: req.user });
});

module.exports = router;