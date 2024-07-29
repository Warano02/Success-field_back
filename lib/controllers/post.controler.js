const Mailler = require("../app/confirm/email");
const vE = require("../app/verify/mail/index");
const tel = require("../app/verify/phone_number");
const { status } = require("../config/db");

const FormMail = require("../helper/function/mailerF");
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function sendMail(email, object) {
    switch (object) {
        case "Confirm_mail":
            let code = getRandomInt(100000);
            let html = FormMail(email, code)
            Mailler(email, "Confirmation de votre compte", "Success-field", html)
            return code
            break;
        default:
            return false
            break;
    }
}

module.exports = { vE, tel, sendMail };
