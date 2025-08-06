// routes/email/resetPassword.js

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Environment variables must be set securely in .env
const { EMAIL, PASSWORD } = process.env;

// Validate input structure (recommended to extract to middleware)
function validateResetRequest(req, res, next) {
  const { email, name, resetLink } = req.body;
  if (!email || !name || !resetLink) {
    return res.status(400).json({ error: 'Email, name, and resetLink are required.' });
  }
  next();
}

router.post('/', validateResetRequest, async (req, res) => {
  const { email, name, resetLink } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    bcc: ['info@gtm4health.com', 'shashi@gtm4health.com'],
    subject: `🔐 Password Reset Instructions - GTMScale`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h3>Hello ${name},</h3>
        <p>We received a request to reset your password for your <strong>GTMScale</strong> account.</p>
        <p>Click the link below to reset your password. This link will expire in 15 minutes for your security:</p>
        <p><a href="${resetLink}" target="_blank" style="color: #1a73e8;">Reset Your Password</a></p>
        <p>If you didn’t request this, please ignore this email or <a href="mailto:support@gtm4health.com">contact support</a>.</p>
        <br />
        <p>— GTM4Health Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[INFO] Reset email sent to ${email}`);
    res.status(200).json({ message: 'Reset email sent successfully.' });
  } catch (err) {
    console.error(`[ERROR] Failed to send reset email to ${email}:`, err);
    res.status(500).json({ error: 'Failed to send reset email. Please try again later.' });
  }
});

module.exports = router;
