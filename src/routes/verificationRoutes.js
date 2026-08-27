import express from "express";
import {
    verifyEmailAccount, resendVerifyEmailAccount
} from "../controllers/verificationController.js";
import { validateVerify } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.get(
    "/verify",
    verifyEmailAccount
);

router.post("/resend", validateVerify, resendVerifyEmailAccount)

export default router;