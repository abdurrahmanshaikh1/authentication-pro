import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config(); 

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.log('Email transporter error:', error);
    } else {
        console.log('Email transporter ready!');
    }
});

export const sendVerificationEmail = async (email, token, name) => {
    const verificationUrl = `http://localhost:3000/api/auth/verify-email/${token}`;
    
    try {
        const info = await transporter.sendMail({
            from: `"Authenticate-profile" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Verify your Account',
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2>Hello ${name}!</h2>
                <p>Your Authenticate-profile account is almost ready! Please verify your email:</p>

                <!-- Clickable email-safe button -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
                  <tr>
                    <td align="center" bgcolor="#ff6b6b" style="border-radius: 5px;">
                      <a href="${verificationUrl}" target="_blank" style="
                        display: inline-block;
                        padding: 12px 25px;
                        cursor: pointer
                        font-family: Arial, sans-serif;
                        font-size: 16px;
                        color: #ffffff;
                        text-decoration: none;
                        font-weight: bold;
                      ">
                        Verify My Email
                      </a>
                    </td>
                  </tr>
                </table>

                <p>Or copy this link: <strong>${verificationUrl}</strong></p>
                <p>This link expires in 1 hour.</p>
                <hr>
                <p>Thanks,<br>Authenticate-profile Team</p>
            </div>
            `
        });

        console.log(` Verification email successfully sent to ${email}`);
        console.log(`Message ID: ${info.messageId}`); 
        console.log(`Preview URL (for testing with ethereal.email): ${nodemailer.getTestMessageUrl(info)}`);

    } catch (error) {
        console.log(` Failed to send verification email to ${email}:`, error.message);
        throw error; 
    }
};
