// server/routes/email.js
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

router.post('/', async (req, res) => {
  const { email, name } = req.body;

  // Set up nodemailer transporter
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

  // Set up email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Welcome to GTM4Health, ${name}!`,
    text: `Hello ${name},\n\nWelcome to GTMScale! We are excited to have you on board.\n\nBest regards,\nGTM4Health Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
