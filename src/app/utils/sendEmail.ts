import nodemailer from "nodemailer";
import config from "../config";

const sendEmail = async (email: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: config.nodemailer_email,
      pass: config.nodemailer_app_password,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: config.nodemailer_email,
    to: email,
    subject: "Reset Password Link",
    // text: "Hello world?", // plain text body
    html: html,
  });
};

export default sendEmail;
