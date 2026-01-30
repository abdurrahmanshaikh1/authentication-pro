
import nodemailer from 'nodemailer';
console.log(process.env.EMAIL_USER)
console.log(process.env.EMAIL_PASS)

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:'abdurrahmanshaikh121212@gmail.com',
        pass: 'xsbzqbzauyqhcptd'
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log('Email transporter error:', error);
    } else {
        console.log('Email transporter ready!');
    }
});

export const sendVerificationEmail = async (email, token, name) => {
    const verificationUrl = `http://localhost:3000/verify-email/${token}`;
    
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify your Tiggle Account',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333;">Hello ${name}! </h2>
            <p>Your Tiggle account is almost ready! Please verify your email:</p>
            
            <a href="${verificationUrl}" 
               style="background: linear-gradient(45deg, #ff6b6b, #feca57); 
                      color: white; padding: 15px 30px; text-decoration: none; 
                      border-radius: 50px; display: inline-block; 
                      font-weight: bold; font-size: 16px; 
                      box-shadow: 0 4px 15px rgba(255,107,107,0.3);">
                Verify My Email
            </a>
            
            <p style="margin-top: 20px; color: #666;">
                Or copy this link: <strong>${verificationUrl}</strong>
            </p>
            <p>This link expires in 1 hour</p>
            
            <hr style="margin: 30px 0;">
            <p>Thanks,<br><strong>Tiggle Team</strong></p>
        </div>
        `
    });
};
