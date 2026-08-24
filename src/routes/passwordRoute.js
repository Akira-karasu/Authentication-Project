import express from "express";
import { forgotPassword, verifyPasswordReset, changeNewPassword } from "../controllers/passwordController.js";

const router = express.Router();

router.post("/forgot", forgotPassword);
router.post("/verifyReset", verifyPasswordReset)
router.post("/resetPassword", changeNewPassword)

export default router;

