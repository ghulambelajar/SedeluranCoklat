const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect, authorize } = require("../middlewares/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Selamat, Anda berhasil masuk",
    userData: req.user,
  });
});

module.exports = router;
