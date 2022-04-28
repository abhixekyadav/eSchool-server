import express from "express";

const router = express.Router();

// middlewares
import { requireSignin } from "../middlewares";
// controller
import { supportEmail } from "../controllers/email";

router.post("/contact-support", requireSignin, supportEmail);

module.exports = router;
