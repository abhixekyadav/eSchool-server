const express = require("express");

const router = express.Router();

// middleware
const { requireSignin } = require("../middlewares");

// controllers
const {
  register,
  login,
  logout,
  currentUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get(
  "/.well-known/pki-validation/01A9D2229987B1DFC265F3213A109A57.txt",
  (req, res) => {
    res.send(
      "6C325585324E08B0F1E57B82DD63104793E395445106EF0C59D3139B3DC8B1F6comodoca.coma966a8993344c76"
    );
  }
);

module.exports = router;
