const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    ("Sending email to:", to); 

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS
}
    });

    await transporter.sendMail({
      from: "sumitrjangid23102004@gmail.com",
      to,
      subject,
      text
    });

    ("Email sent successfully");
  } catch (err) {
    ("Email error:", err);
  }
};

module.exports = sendEmail;