import mailTransporter from "../config/mail.js";

export const sendVerificationEmail = async (email, token) => {

    const verificationUrl =
        `${process.env.APP_URL}/api/verification/verify?token=${token}`;

    await mailTransporter.sendMail({
        from: `"Authentication Project" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify your account",

        html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Account</title>
</head>

<body style="
    margin: 0;
    padding: 0;
    background-color: #f4f4f5;
    font-family: Arial, Helvetica, sans-serif;
">

    <div style="
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    ">

        <!-- Header -->
        <div style="
            padding: 30px;
            text-align: center;
            background-color: #18181b;
            color: #ffffff;
        ">
            <h1 style="
                margin: 0;
                font-size: 24px;
            ">
                Authentication Project
            </h1>
        </div>

        <!-- Content -->
        <div style="
            padding: 40px 35px;
            color: #27272a;
        ">

            <h2 style="
                margin-top: 0;
                font-size: 22px;
            ">
                Verify your email address
            </h2>

            <p style="
                font-size: 16px;
                line-height: 1.6;
            ">
                Thanks for creating an account with us!
            </p>

            <p style="
                font-size: 16px;
                line-height: 1.6;
            ">
                To complete your registration and activate your account,
                please verify your email address by clicking the button below.
            </p>

            <!-- Button -->
            <div style="
                text-align: center;
                margin: 30px 0;
            ">
                <a
                    href="${verificationUrl}"
                    style="
                        display: inline-block;
                        padding: 14px 28px;
                        background-color: #18181b;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 8px;
                        font-size: 16px;
                        font-weight: bold;
                    "
                >
                    Verify My Account
                </a>
            </div>

            <p style="
                font-size: 14px;
                line-height: 1.6;
                color: #71717a;
            ">
                This verification link will expire in
                <strong>15 minutes</strong>.
            </p>

            <p style="
                font-size: 14px;
                line-height: 1.6;
                color: #71717a;
            ">
                If you did not create this account, you can safely ignore
                this email.
            </p>

            <hr style="
                border: none;
                border-top: 1px solid #e4e4e7;
                margin: 30px 0;
            ">

            <p style="
                margin: 0;
                font-size: 12px;
                line-height: 1.5;
                color: #a1a1aa;
            ">
                If the button above doesn't work, copy and paste the
                following link into your browser:
            </p>

            <p style="
                word-break: break-all;
                font-size: 12px;
                color: #71717a;
            ">
                ${verificationUrl}
            </p>

        </div>

        <!-- Footer -->
        <div style="
            padding: 20px;
            text-align: center;
            background-color: #fafafa;
            color: #a1a1aa;
            font-size: 12px;
        ">
            <p style="margin: 0;">
                © 2026 Authentication Project
            </p>
        </div>

    </div>

</body>
</html>
`
    });
};