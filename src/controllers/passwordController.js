import { passwordReset, verifyReset } from "../services/passwordService.js";
import { createLog } from "../services/logsService.js";

export const resetPassword = async (req, res) => {
    try{
        const result = await passwordReset(req.body.email);

        res.status(200).json({
            message: "If the email is registered, an OTP has been sent."
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

export const verifyPasswordReset = async (req, res) => {

    try {

        const { email, otp } = req.body;

        const result = await verifyReset(
            email,
            otp
        );

        res.status(200).json({
            message: "OTP verified successfully",
            data: result
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};



