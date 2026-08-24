import db from "../config/database.js";

export const handleFailedLogin = async (userId) => {

    const [users] = await db.execute(
        `SELECT failed_login_attempts, status
         FROM users
         WHERE id = ?`,
        [userId]
    );

    const user = users[0];

    const attempts = user.failed_login_attempts + 1;

    if (attempts >= 10) {

        const lockedUntil = new Date(
            Date.now() + 30 * 60 * 1000
        );

        await db.execute(
            `UPDATE users
            SET failed_login_attempts = ?,
                status = 'suspended',
                locked_until = ?
            WHERE id = ?`,
            [
                attempts,
                lockedUntil,
                userId
            ]
        );

        return {
            suspended: true,
            attempts,
            lockedUntil
        };
    }

    await db.execute(
        `UPDATE users
         SET failed_login_attempts = ?
         WHERE id = ?`,
        [
            attempts,
            userId
        ]
    );

    return {
        suspended: false,
        attempts
    };
};

export const resetFailedLoginAttempts = async (userId) => {

    await db.execute(
        `UPDATE users
         SET failed_login_attempts = 0 AND locked_until = NULL
         WHERE id = ?`,
        [userId]
    );

};
