import {
    verifyEmail, resendVerification
} from "../services/verificationService.js";

import { createLog } from "../services/logsService.js";

export const verifyEmailAccount = async (req, res) => {

    try {

        const { token } = req.query;

        const user_id = await verifyEmail(token);

        await createLog({
            userId: user_id,
            action: "VERIFIED",
            description: "User is verified",
            ipAddress: req.ip,
            userAgent: req.get("user-agent")
        })

        res.status(200).json({
            message: "Email verified successfully"
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};

export const resendVerifyEmailAccount = async (req, res) => {
    try {
        const email = req.body.email;

        const getToken = await resendVerification(email) // remove this once It implements in UI

        console.log("Get Reset Token: ", getToken);

        res.status(200).json({
            message: "verification resend"
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}
