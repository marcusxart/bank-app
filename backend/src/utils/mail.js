const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const {
  SMTP_PASSWORD,
  SMTP_USER,
  SMTP_PORT,
  SMTP_HOST,
  MAIL_SENDER,
  MAIL_SUPPORT,
  APP_NAME,
  CLIENT_URL,
  CLIENT_WEBSITE,
} = require("../../variables");

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: parseInt(SMTP_PORT, 10),
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
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
module.exports = async (mailData, viewName, templateData) => {
  try {
    const templatePath = path.join(__dirname, "..", "views", `${viewName}.ejs`);
    const year = new Date().getFullYear().toLocaleString();
    const htmlContent = await ejs.renderFile(templatePath, {
      ...templateData,
      app_name: APP_NAME,
      mail_support: MAIL_SUPPORT,
      year,
      app_url: CLIENT_URL,
      app_website: CLIENT_WEBSITE,
    });

    const mailOptions = {
      from: MAIL_SENDER,
      to: mailData.to,
      subject: mailData.subject,
      html: htmlContent,
    };

    return setupSend(mailOptions);
  } catch (error) {
    return Promise.reject(error);
  }
};
