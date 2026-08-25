import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { createLog } from "./logsService.js";
import db from "../config/database.js";
import { createVerificationToken, resendVerification } from "./verificationService.js";
import { sendVerificationEmail } from "./emailService.js";
import { handleFailedLogin, resetFailedLoginAttempts } from "./loginAttemptService.js";

export const registerUser = async (userData) => {

    const {
        username,
        email,
        password,
    } = userData;

    // Check if user already exists
    const [users] = await db.execute(
        `SELECT id, email, username
         FROM users
         WHERE email = ?
            OR username = ?`,
        [email, username]
    );


    if (users.length > 0) {

        const existingUser = users[0];

        if (existingUser.email === email) {
            throw new Error("Email already exists");
        }

        if (existingUser.username === username) {
            throw new Error("Username already exists");
        }
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
    
    await sendVerificationEmail(email, token_verification)

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
            role,
            locked_until
         FROM users
         WHERE email = ?`,
        [email]
    );

    const user = users[0];

    if (!user) {
        throw new Error("Invalid email or password");
    }

    if (user.locked_until && new Date() < new Date(user.locked_until)) {
        throw new Error(
            "Account is temporarily locked. Please try again later."
        );
    }

    if (user.locked_until && new Date() >= new Date(user.locked_until)) {
        await db.execute(
            `UPDATE users
            SET status = 'active',
                locked_until = NULL,
                failed_login_attempts = 0
            WHERE id = ?`,
            [user.id]
        );
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );

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

    if (!passwordMatch) {
        await handleFailedLogin(user.id);
        throw new Error("Invalid email or password");
    }


    await resetFailedLoginAttempts(user.id);

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


export const logoutUser = async ({
    userId,
    email,
    ipAddress,
    userAgent
}) => {

    await createLog({
        userId,
        email,
        action: "LOGOUT",
        description: "User logged out successfully",
        ipAddress,
        userAgent
    });

};