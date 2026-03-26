import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });

    // Validate that SMTP vars exist before trying to send.
    // If they aren't configured, we just fake success.
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('Mock email sent from', name, ':', subject);
      return res.status(200).json({ status: 'ok' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.SMTP_TO || process.env.SMTP_USER,
      subject: `Anne Contact Form: ${subject || 'New Message'}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    res.json({ status: 'ok' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;
