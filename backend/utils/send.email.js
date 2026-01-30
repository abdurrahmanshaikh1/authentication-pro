// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransporter({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

// const sendVerificationEmail = async (email, token, name) => {
//     const verificationUrl = `http://localhost:3000/verify-email/${token}`;
    
//     await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: 'Verify your Tiggle account',
//         html: `<h2>Hello ${name}!</h2><a href="${verificationUrl}">Verify Email</a>`
//     });
// };

// module.exports = { sendVerificationEmail };
