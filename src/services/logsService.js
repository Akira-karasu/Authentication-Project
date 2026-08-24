import db from "../config/database.js";

export const createLog = async ({
    userId = null,
    email = null,
    action,
    description = null,
    ipAddress = null,
    userAgent = null
}) => {

    await db.execute(
        `INSERT INTO logs
        (
            user_id,
            email,
            action,
            description,
            ip_address,
            user_agent
        )
        VALUES ( ?, ?, ?, ?, ?, ?)`,
        [
            userId,
            email,
            action,
            description,
            ipAddress,
            userAgent
        ]
    );
};