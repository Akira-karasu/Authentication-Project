import nodemailer from "nodemailer";

const mailTransporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const testMailer = async () => {
    try {
        await mailTransporter.verify();

        console.log("SMTP server is ready");

        return true;
    } catch (error) {
        console.error("SMTP Error:", error);

        return false;
    }
};

export default mailTransporter;