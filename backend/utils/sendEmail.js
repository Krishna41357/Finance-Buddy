import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  // Configure transporter with your SMTP details or Gmail (app password)
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,       // your email
      pass: process.env.EMAIL_PASS        // your email password or app password
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html
  });
};

