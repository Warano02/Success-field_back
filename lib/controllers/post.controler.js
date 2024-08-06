const Mailler = require("../app/confirm/email");
const vE = require("../app/verify/mail/index");
const tel = require("../app/verify/phone_number");
const path = require('path');
const multer = require("multer")
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
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/audio')); // Dossier de destination
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Ajoutez un timestamp au nom du fichier
    }
});

const upload = multer({ storage: storage });

module.exports = { vE, tel, sendMail,upload };
