import db from "../config/database.js";
import { createOTP, verifyOTP } from "./otpServices.js";
import { sendPasswordReset } from "./emailService.js";
import { hashToken } from "../utils/hashtoken.js";
import { randomBytes } from "crypto";
import bcrypt from "bcrypt";

export const otpPasswordReset = async (email) => {
    const [users] = await db.execute(
        "SELECT id FROM users WHERE email = ?",
        [email]
    );

    const user = users[0].id;

    const generated_otp = await createOTP(user, "PASSWORD_RESET");

    await sendPasswordReset(email, generated_otp)

};

export const resetPasswordReq = async (id) => {

    const changePassToken = randomBytes(32).toString("hex");

    const tokenHash = hashToken(changePassToken);

    const expiresAt = new Date(
        Date.now() + 5 * 60 * 1000
    );

    await db.execute(
        `
        INSERT INTO password_reset_tokens
        (
            user_id,
            token_hash,
            expires_at
        ) VALUES ( ?, ?, ?)
        `,
        [
            id,
            tokenHash,
            expiresAt
        ]
    )

    return changePassToken;

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

    const resetPassToken = await resetPasswordReq(user.id)

    return {
        reset_token: resetPassToken
    };
};

export const changePassword = async (resetToken, newPassword) => {

    const tokenHash = hashToken(resetToken);

    const [tokens] = await db.execute(
        `SELECT user_id, expires_at
         FROM password_reset_tokens
         WHERE token_hash = ?`,
        [tokenHash]
    );

    if (tokens.length === 0) {
        throw new Error("Invalid reset token");
    }

    const reset = tokens[0];

    if (new Date() > new Date(reset.expires_at)) {
        throw new Error("Reset token has expired");
    }

    const hashedPassword = await bcrypt.hash(
        newPassword,
        10
    );

    await db.execute(
        `UPDATE users
         SET password = ?
         WHERE id = ?`,
        [
            hashedPassword,
            reset.user_id
        ]
    );

    await db.execute(
        `DELETE FROM password_reset_tokens
         WHERE token_hash = ?`,
        [tokenHash]
    );

    return true;
};



