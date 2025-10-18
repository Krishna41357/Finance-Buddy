import nodemailer from 'nodemailer';

// Create a test email transporter (configure with your actual email service in production)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export function sendMailToAdmin(contactData) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact Form Submission: ${contactData.subject}`,
    text: `
      New contact form submission:
      Name: ${contactData.name}
      Email: ${contactData.email}
      Subject: ${contactData.subject}
      Message: ${contactData.message}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}
