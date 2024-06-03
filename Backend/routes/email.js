// server/routes/email.js
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

router.post('/', async (req, res) => {
  const { email, name } = req.body;

  // Ensure required fields are provided
  if (!email || !name) {
    return res.status(400).json({ error: 'Email and name are required' });
  }

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


  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Welcome to GTMScale, ${name}!`,
    html: `
      <p>Hello <strong>${name}</strong>,</p>
      <p>Welcome to <strong>GTMScale</strong>! We are thrilled to have you on board.</p>
      <p>At GTMScale, we are dedicated to providing you with the tools and insights to scale your growth efficiently. As part of our community, you will have access to industry-leading resources, cutting-edge technology, and a network of professionals committed to your success.</p>
      <p>Here’s what you can expect:</p>
      <ul>
        <li>Access to our comprehensive analytics platform.</li>
        <li>Personalized support and consultation sessions.</li>
        <li>Exclusive insights and updates on market trends.</li>
      </ul>
      <p>If you have any questions or need assistance, our support team is here to help. Feel free to reach out to us anytime at <a href="mailto:support@gtmscale.com">support@gtmscale.com</a>.</p>
      <p>Best regards,<br>GTMScale Team</p>
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

module.exports = router;
