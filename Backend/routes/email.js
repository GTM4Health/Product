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

//<p>At GTMScale, we are dedicated to providing you with the tools and insights to scale your growth efficiently. As part of our community, you will have access to industry-leading resources, cutting-edge technology, and a network of professionals committed to your success.</p>

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Welcome to GTMScale, ${name}!`,
    html: `
      <p>Hello <strong>${name}</strong>,</p>
      <p>Welcome to <strong>GTMScale</strong>, our Technology Platform for Market Access!</p>      
      <p>Here are a few of the features you can use in GTMScale</p>
      <ul>
        <li><strong>Market Access Information</strong> to Healthcare Centres across different Cities</li>
        <li>Access Information of <strong>Dealers/Distributors & MedTech Companies</strong></li>
        <li><strong>Market Insights Reports</strong> of different Medical Technologies</li>
        <li>Information about <strong> CSRs/Foundations </strong> supporting different causes.</li>
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

module.exports = router;
