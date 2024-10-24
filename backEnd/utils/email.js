/* eslint-disable prettier/prettier */
const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Youssef Safwat <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    // if (process.env.NODE_ENV === "production") {
    //   // Production transport (e.g., SendGrid)
    //   return nodemailer.createTransport({
    //     service: "SendGrid",
    //     auth: {
    //       user: process.env.SENDGRID_USERNAME,
    //       pass: process.env.SENDGRID_PASSWORD,
    //     },
    //   });
    // }
    // Development transport
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT, 10),
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
      debug: true,
    });
  }

  // Send the actual email
  async send(subject, htmlContent) {
    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: htmlContent,
      text: htmlToText.htmlToText(htmlContent),
    };
    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    const html = `
      <div style="font-family: Arial, sans-serif; text-align: center;">
        <h1>Welcome, ${this.firstName}!</h1>
        <p>Thank you for joining the CraftMoka family. We're excited to have you with us!</p>
        <a href="${this.url}" style="color: #fff; background-color: #A03907; padding: 10px 20px; text-decoration: none;">Visit CraftMoka</a>
      </div>
    `;
    await this.send("Welcome to the CraftMoka Family!", html);
  }

  async sendPasswordReset() {
    const html = `
      <div style="font-family: Arial, sans-serif; text-align: center;">
        <h1>Password Reset</h1>
        <p>Hello ${this.firstName},</p>
        <p>You requested to reset your password. Click the link below to reset it:</p>
        <a href="${this.url}" style="color: #fff; background-color: #A03907; padding: 10px 20px; text-decoration: none;">Reset Password</a>
        <p>This link will expire in 10 minutes.</p>
      </div>
    `;
    await this.send(
      "Your password reset token (valid for only 10 minutes)",
      html
    );
  }
};
