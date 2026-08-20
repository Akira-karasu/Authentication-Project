import db from "../config/database.js";
import { createOTP, verifyOTP } from "./otpServices.js";
import { sendPasswordReset } from "./emailService.js";

export const passwordReset = async (email) => {
    const [users] = await db.execute(
        "SELECT id FROM users WHERE email = ?",
        [email]
    );

    const user = users[0].id;

    const generated_otp = await createOTP(user, "PASSWORD_RESET");

    await sendPasswordReset(email, generated_otp)

};

export const verifyReset = async (email, otp) => {

    // Find user
    const [users] = await db.execute(
        `SELECT id
         FROM users
         WHERE email = ?`,
        [email]
    );

    if (users.length === 0) {
        throw new Error("Invalid request");
    }

    const user = users[0];

    // Verify OTP
    await verifyOTP(
        user.id,
        "PASSWORD_RESET",
        otp
    );

    return {
        verified: true
    };
};


