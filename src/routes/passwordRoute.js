import express from "express";
import { forgotPassword, verifyPasswordReset, changeNewPassword } from "../controllers/passwordController.js";
import { validateChangePass, validateForgot, validateReset } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/forgot", validateForgot, forgotPassword);
router.post("/verifyReset", validateReset, verifyPasswordReset)
router.post("/resetPassword", validateChangePass, changeNewPassword)

export default router;

