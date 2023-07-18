const nodemailer = require("nodemailer");
const fs = require("fs").promises;

async function sendEmail() {
  try {
    // Create a transporter object with your email service provider's SMTP settings
    const transporter = nodemailer.createTransport({
      service: "your_email_service_provider", // e.g., 'gmail'
      auth: {
        user: "your_email_address",
        pass: "your_email_password"
      }
    });
    // Read the HTML template file
    const html = await fs.readFile("path/to/template.html", "utf8");
    // Define the email options
    const mailOptions = {
      from: "sender_email_address",
      to: "recipient_email_address",
      subject: "Email Subject",
      html: html
    };
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = { sendEmail };
