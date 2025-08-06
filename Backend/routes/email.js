// server/routes/email.js
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

router.post('/', async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Email and name are required' });
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    bcc: ['info@gtm4health.com', 'shashi@gtm4health.com'],
    subject: `Welcome to GTMScale, ${name}!`,
    html: `
      <p>Hello <strong>${name}</strong>,</p>
      <p>Welcome to <strong>GTMScale</strong>, our Technology Platform for Market Access!</p>      
      <p>Here are a few of the features you can use in GTMScale:</p>
      <ul>
        <li><strong>Market Access Information</strong> to Healthcare Centres across different Cities</li>
        <li>Access Information of <strong>Dealers/Distributors & MedTech Companies</strong></li>
        <li><strong>Market Insights Reports</strong> of different Medical Technologies</li>
        <li>Information about <strong>CSRs/Foundations</strong> supporting different causes</li>
      </ul>
      <p>We do hope you find this useful in your Market Access.</p>
      <p>Best regards,<br>GTM4Health Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});



router.post('/reset-password', async (req, res) => {
  const { email, name, resetLink } = req.body;

  if (!email || !name || !resetLink) {
    return res.status(400).json({ error: 'Email, name, and reset link are required' });
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    bcc: ['info@gtm4health.com', 'shashi@gtm4health.com'],
    subject: `Password Reset Instructions for GTMScale`,
    html: `
      <p>Hello <strong>${name}</strong>,</p>
      <p>We received a request to reset your password for your <strong>GTMScale</strong> account.</p>
      <p>Please click the link below to reset your password:</p>
      <p><a href="${resetLink}" target="_blank">${resetLink}</a></p>
      <p>If you did not request this change, please ignore this email or contact our support team.</p>
      <p>Best regards,<br>GTM4Health Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Reset email sent successfully' });
  } catch (error) {
    console.error('Error sending reset email:', error);
    res.status(500).json({ error: 'Failed to send reset email' });
  }
});



module.exports = router;
