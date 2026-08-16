import db from "../config/database.js";
export const userProfile = async ({ userId }) => {

    const [users] = await db.execute(
        `SELECT
            users.id,
            users.username,
            users.email,
            personal_info.firstname,
            personal_info.middlename,
            personal_info.lastname,
            personal_info.contact_no,
            profile_images.image_url
        FROM users
        INNER JOIN personal_info
            ON users.id = personal_info.user_id
        INNER JOIN profile_images
            ON users.id = profile_images.user_id
        WHERE users.id = ?`,
        [userId]
    );

    if (users.length === 0) {
        throw new Error("User not found");
    }

    return users[0];
};