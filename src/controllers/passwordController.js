import { otpPasswordReset, verifyReset, changePassword } from "../services/passwordService.js";
import { sanitizeString } from "../utils/sanitization.js";

export const forgotPassword = async (req, res) => {
    try{
        await otpPasswordReset(sanitizeString(req.body.email));

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


export const changeNewPassword = async (req, res) => {
    try {

        const {
            resetToken,
            newPassword
        } = req.body;

        await changePassword(
            resetToken,
            newPassword
        );

        res.status(200).json({
            message: "Password changed successfully"
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};



