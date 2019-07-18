const nodemailer = require('nodemailer');

const params = {
  email: 'raphaeldeoliveiramoura@hotmail.com',
  password: 'xxx',
  remitee: 'brunosantosprotec@gmail.com',
  subject: 'Email pro bruno',
  body: 'This email was made with a cloud function'
};

(async () => {
  const output = await main(params);
  console.log(output);
})()

async function main() {
  try {
    const transporter = buildTransporter(params);
    const mailOptions = buildMailOptions(params);
    const result = await makeRequestToSendEmail(transporter, mailOptions);
    return (JSON.stringify(result, null, 2));
  } catch (error) {
    const errorMessage = error.message || error;
    return ({ error: errorMessage });
  }
}

function buildTransporter(params) {
  const { email, password } = params;
  const service = findServiceInCompleteEmail(email);
  const transporter = nodemailer.createTransport({
    service: service,
    auth: {
      user: email,
      pass: password
    }
  });
  return transporter;
}

function findServiceInCompleteEmail(email) {
  try {
    const service = email.split('@').pop().split('.')[0];
    return service;
  } catch (error) {
    throw new Error('invalid email');
  }
}

function buildMailOptions(params) {
  const { email, remitee, subject, body } = params;
  const mailOptions = {
    from: email,
    to: remitee,
    subject: subject,
    html: body
  };
  return mailOptions;
}

function makeRequestToSendEmail(transporter, mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) reject(error);
      resolve(info);
    });
  });
}
