const asyncHandler = require("express-async-handler");
const sendMail = require("../utils/mail");

exports.testing = asyncHandler(async (req, res) => {
  const info = await sendMail(
    {
      to: "cemeji64@gmail.com",
      subject: "Get this responsive",
    },
    "welcome",
    {
      user: "John Doe",
      suportLink: "support@chase.com",
      loginLink: "#",
    }
  );

  res.status(200).send(info);
});
