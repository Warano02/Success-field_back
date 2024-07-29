const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "carineteoi@gmail.com",
    pass: "phxh kqxs cjad ewjh",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(to,subject,title,html) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'waranoEntreprise@outlook.com', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: title, // plain text body
    html: html, // html body
  });
  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
// main("carineteoi@gmail.com","Je test juste cette api","bonjours mon grand","<h1>Bonjours. ton code est le 220256</h1>").catch(console.error);
module.exports=main