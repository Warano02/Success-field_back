"use strict"
const Mailler = require("../app/confirm/email");
const vE = require("../app/verify/mail/index");
const tel = require("../app/verify/phone_number");
const path = require('path');
const multer = require("multer")
const FormMail = require("../helper/function/mailerF");
const { porfolios } = require("../config/db");
const { MailPorfolio } = require("../helper/src/mailSend");
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

function new_commande(name, email, phone, subject, mail) {
    return new Promise((resolve, reject) => {
        const Mail = MailPorfolio(name, email, subject)
        Mailler("carineteoi@gmail.com", "Nouveau contact depuis le porfolio", "Gang", Mail)
            .then(_ => {
                porfolios.create({ nom: name, tel: phone, email, projet: subject, message: mail })
                resolve("Tout est derouler avec succès ")
            }).catch(err => {
                console.log(err);
                reject("Une erreur est survenue lors de l'envoie du nouveau contact")
            })
    })

}



const upload = multer({ storage: storage });

module.exports = { vE, tel, sendMail, upload ,new_commande};
