import express from "express";
import { resetPassword, verifyPasswordReset } from "../controllers/passwordController.js";

const router = express.Router();

router.post("/reset", resetPassword);
router.post("/verifyReset", verifyPasswordReset)

export default router;

