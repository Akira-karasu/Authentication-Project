import express from "express";
import {
    verifyEmailAccount, resendVerifyEmailAccount
} from "../controllers/verificationController.js";

const router = express.Router();

router.get(
    "/verify",
    verifyEmailAccount
);

router.post("/resend", resendVerifyEmailAccount)

export default router;