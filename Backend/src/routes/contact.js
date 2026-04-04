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

    const info = await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER || 'no-reply@anne.studio'}>`, // sender address
      replyTo: email,
      to: process.env.SMTP_TO || "kiboxsonleena51@gmail.com", // list of recipients
      subject: `Anne Contact Form: ${subject || 'New Message'}`, // subject line
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`, // plain text body
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #ba9eff;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `, // HTML body
    });

    console.log("Message sent: %s", info.messageId);
    
    // Preview URL is only available when using an Ethereal test account
    if (info.messageId.includes('ethereal')) {
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    res.json({ status: 'ok' });
  } catch (err) {
    console.error("Error while sending mail:", err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;
