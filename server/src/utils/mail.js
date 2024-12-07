require("dotenv").config();
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

function setupSend(mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      }
      resolve(info);
    });
  });
}

/**
 * Renders the ejs template and sends an email.
 *
 * @param {Object} mailData - The data to use in the email.
 * @param {string} mailData.to - The recipient's email address.
 * @param {string} mailData.subject - The subject of the email.
 * @param {string} viewFile - The view file name.
 * @param {Object} templateData - The data to pass to the EJS template.
 * @returns {Promise<Object>} - A promise that resolves with the info object if the email is sent successfully, or rejects with an error.
 */
module.exports = sendMail = async (mailData, viewName, templateData) => {
  try {
    const templatePath = path.join(__dirname, "..", "views", `${viewName}.ejs`);
    const support_link = process.env.SUPPORT_LINK;
    const htmlContent = await ejs.renderFile(templatePath, {
      ...mailData,
      ...templateData,
      subject: mailData.subject,
      bank_name: process.env.APP_NAME,
      support_link,
    });

    const mailOptions = {
      from: support_link,
      to: mailData.to,
      subject: mailData.subject,
      html: htmlContent,
    };

    return setupSend(mailOptions);
  } catch (error) {
    return Promise.reject(error);
  }
};
