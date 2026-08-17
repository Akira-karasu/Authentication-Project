import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { createLog } from "./logsService.js";
import db from "../config/database.js";
import { createVerificationToken, resendVerification } from "./verificationService.js";

export const registerUser = async (userData) => {

    const {
        username,
        email,
        password,
    } = userData;

    // Check if user already exists
    const [users] = await db.execute(
        "SELECT id FROM users WHERE email = ?",
        [email]
    );

    if (users.length > 0) {
        throw new Error("Email already exists");
    }

    // Generate user ID
    const id = randomUUID();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await db.execute(
        `INSERT INTO users
        (id, username, email, password)
        VALUES (?, ?, ?, ?)`,
        [
            id,
            username,
            email,
            hashedPassword
        ]
    );

    // Create personal information record
    await db.execute(
        `INSERT INTO personal_info
        (user_id)
        VALUES (?)`,
        [id]
    );

    // Create profile image record
    await db.execute(
        `INSERT INTO profile_images
        (user_id)
        VALUES (?)`,
        [id]
    );

    const token_verification = await createVerificationToken(id)

    // make an email callout here for token_verification

    return {
        id,
        username,
        email
    };
};

export const loginUser = async (userData) => {

    const {
        email,
        password
    } = userData;

    const [users] = await db.execute(
        `SELECT
            id,
            username,
            email,
            password,
            status,
            role
         FROM users
         WHERE email = ?`,
        [email]
    );

    if (users.length === 0) {
        throw new Error("Invalid email or password");
    }

    const user = users[0];

    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatch) {
        throw new Error("Invalid email or password");
    }

    if (user.status === "unverified") {
        throw new Error("Please verify your email first");
    }

    if (user.status === "inactive") {
        throw new Error("Account is inactive");
    }

    if (user.status === "suspended") {
        throw new Error("Account is suspended");
    }

    if (user.status === "banned") {
        throw new Error("Account is banned");
    }

    const token = jwt.sign(
        {
            userId: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    return {
        id: user.id,
        token
    };
};