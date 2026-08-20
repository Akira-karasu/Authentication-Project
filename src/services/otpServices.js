import { generateOTP } from "../utils/otp.js";
import crypto from "crypto";
import db from "../config/database.js";

export const createOTP = async (userId, purpose) => {

    // Check existing OTP
    const [existingOTP] = await db.execute(
        `SELECT id, created_at
         FROM otp_codes
         WHERE user_id = ?
         AND purpose = ?
         ORDER BY created_at DESC
         LIMIT 1`,
        [userId, purpose]
    );

    // Check cooldown
    if (existingOTP.length > 0) {

        const existing = existingOTP[0];

        const createdAt = new Date(existing.created_at);
        const now = new Date();

        const elapsed = now - createdAt;

        if (elapsed < 60 * 1000) {
            throw new Error(
                "Too many requests. Please wait before requesting another OTP."
            );
        }

        // Delete old OTP
        await db.execute(
            `DELETE FROM otp_codes
             WHERE id = ?`,
            [existing.id]
        );
    }

    // Generate OTP
    const otp = generateOTP();

    // Hash OTP
    const otpHash = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");

    // OTP expires in 5 minutes
    const expiresAt = new Date(
        Date.now() + 5 * 60 * 1000
    );

    // Save OTP
    await db.execute(
        `INSERT INTO otp_codes (
            user_id,
            otp_hash,
            purpose,
            expires_at
        )
        VALUES (?, ?, ?, ?)`,
        [
            userId,
            otpHash,
            purpose,
            expiresAt
        ]
    );

    return otp;
};

export const verifyOTP = async (userId, purpose, inputOTP) => {

    const [records] = await db.execute(
        `SELECT
            id,
            otp_hash,
            attempts,
            expires_at
         FROM otp_codes
         WHERE user_id = ?
         AND purpose = ?
         ORDER BY created_at DESC
         LIMIT 1`,
        [userId, purpose]
    );

    if (records.length === 0) {
        throw new Error("OTP not found");
    }

    const otp = records[0];

    // Check expiration
    if (new Date() > new Date(otp.expires_at)) {

        await db.execute(
            `DELETE FROM otp_codes
             WHERE id = ?`,
            [otp.id]
        );

        throw new Error("OTP has expired");
    }

    // Check attempts
    if (otp.attempts >= 6) {

        await db.execute(
            `DELETE FROM otp_codes
             WHERE id = ?`,
            [otp.id]
        );

        throw new Error("Too many attempts");
    }

    // Hash submitted OTP
    const otpHash = crypto
        .createHash("sha256")
        .update(inputOTP)
        .digest("hex");

    // Compare
    if (otpHash !== otp.otp_hash) {

        await db.execute(
            `UPDATE otp_codes
             SET attempts = attempts + 1
             WHERE id = ?`,
            [otp.id]
        );

        throw new Error("Invalid OTP");
    }

    // OTP is valid
    await db.execute(
        `DELETE FROM otp_codes
         WHERE id = ?`,
        [otp.id]
    );

    return true;
};
