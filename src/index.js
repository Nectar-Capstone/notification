const express = require("express");
const { json, urlencoded } = express;
const EmailService = require("./email/email.service");
const SmsService = require("./sms/sms.service");
const { body, validationResult } = require("express-validator");

const app = express();
const port = 5000;
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(200).send({
    message: "Hello World",
  });
});

app.post("/email", (req, res) => {
  const {
    body: { email },
  } = req;
  const mail = [email];
  const subject = "Email confirmed";
  const template = `
  <body>
   <p><b>Hi,</b></p>
   <p><b>Thanks for your submission</b>, your email address has been recorded successfully</p>
  </body>
  `;
  EmailService.sendMail(mail, subject, template)
    .then((data) => {
      console.log("sending mail");
      console.log(data);
    })
    .catch((err) => console.log(err));
  return res.status(202).json({
    message: "Request is accepted and sent to AWS SES",
  });
});

app.post(
  "/send-sms",
  body("phone_number").isMobilePhone("th-TH"),
  body("message").not().isEmpty(),
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const response = await SmsService.sendSms(
        req.body.phone_number,
        req.body.message
      );
      res.status(202).json(response);
    } catch (error) {
      return res.status(500).json({ errors: error });
    }
  }
);

app.listen(port, () => {
  console.log(`app running on port: ${port}`);
});
