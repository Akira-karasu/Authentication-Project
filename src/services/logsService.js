import db from "../config/database.js";

export const createLog = async ({
    userId = null,
    action,
    description = null,
    ipAddress = null,
    userAgent = null
}) => {

    await db.execute(
        `INSERT INTO logs
        (
            user_id,
            action,
            description,
            ip_address,
            user_agent
        )
        VALUES ( ?, ?, ?, ?, ?)`,
        [
            userId,
            action,
            description,
            ipAddress,
            userAgent
        ]
    );
};