import {
    randomBytes,
} from "crypto";
import { hashToken } from "../utils/hashtoken.js";

import db from "../config/database.js";

export const createVerificationToken = async (userId) => {

    const token = randomBytes(32).toString("hex");

    const tokenHash = hashToken(token)

    const expiresAt = new Date(
        Date.now() + 15 * 60 * 1000
    );

    await db.execute(
        `INSERT INTO verification_tokens
        (
            user_id,
            token_hash,
            expires_at
        )
        VALUES ( ?, ?, ?)`,
        [
            userId,
            tokenHash,
            expiresAt
        ]
    );

    return token;
};

export const resendVerification = async (email) => {

    const [users] = await db.execute(
        `SELECT id, status
         FROM users
         WHERE email = ?`,
        [email]
    );

    if (users.length === 0) {
        throw new Error("Invalid request");
    }

    const user = users[0];

    if (user.status === "active") {
        throw new Error("Account is already verified");
    }

    if (user.status !== "unverified") {
        throw new Error("Account cannot request verification");
    }

    // Check resend cooldown
    const [tokens] = await db.execute(
        `SELECT created_at
         FROM verification_tokens
         WHERE user_id = ?
         ORDER BY created_at DESC
         LIMIT 1`,
        [user.id]
    );

    if (tokens.length > 0) {

        const lastSent = new Date(tokens[0].created_at);

        const cooldown = 60 * 1000; // 60 seconds

        const elapsed = Date.now() - lastSent.getTime();

        if (elapsed < cooldown) {

            const remaining = Math.ceil(
                (cooldown - elapsed) / 1000
            );

            throw new Error(
                `Please wait ${remaining} seconds before requesting another verification email`
            );
        }
    }

    // Generate new token
    const token = randomBytes(32).toString("hex");

    // Hash token
    const tokenHash = hashToken(token)

    // Token expires in 15 minutes
    const expiresAt = new Date(
        Date.now() + 15 * 60 * 1000
    );

    // Delete previous token
    await db.execute(
        `DELETE FROM verification_tokens
         WHERE user_id = ?`,
        [user.id]
    );

    // Insert new token
    await db.execute(
        `INSERT INTO verification_tokens
        (
            user_id,
            token_hash,
            expires_at
        )
        VALUES (?, ?, ?)`,
        [
            user.id,
            tokenHash,
            expiresAt
        ]
    );

    return token;
};


export const verifyEmail = async (token) => {

    if (!token) {
        throw new Error("Verification token is required");
    }

    const tokenHash = hashToken(token)

    const [tokens] = await db.execute(
        `SELECT
            id,
            user_id,
            expires_at
         FROM verification_tokens
         WHERE token_hash = ?`,
        [tokenHash]
    );

    if (tokens.length === 0) {
        throw new Error("Invalid verification token");
    }

    const token_log = tokens[0];

    if (new Date() > new Date(token_log.expires_at)) {
        throw new Error("Verification token has expired");
    }

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        await connection.execute(
            `UPDATE users
             SET status = 'active'
             WHERE id = ?`,
            [token_log.user_id]
        );

        await connection.execute(
            `DELETE FROM verification_tokens
             WHERE id = ?`,
            [token_log.id]
        );

        await connection.commit();

    } catch (error) {

        await connection.rollback();
        throw error;

    } finally {

        connection.release();
    }

    const [users] = await db.execute(
        `SELECT id, email FROM users WHERE id = ?`,
        [token_log.user_id]
    )

    const user = users[0]

    return {
        user_id: user.id,
        email: user.email
    }

};