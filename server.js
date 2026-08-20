import app from "./src/app.js";
import dotenv from "dotenv";
import { testConnection } from "./src/config/database.js";
import { testMailer } from "./src/config/mail.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {

        await testConnection();
        await testMailer();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {

        console.error("Failed to start server:", error);
        process.exit(1);

    }
};

startServer();