const express = require("express");
const { tel, vE, sendMail,upload} = require("../controllers/post.controler");
const auth = require("../SECURITY");
const { sequelize, publications, messages } = require("../config/db");
const { getPubOfUser } = require("../controllers/get.contoler");
const { keys } = require("../SECURITY/api.keys");

const path = require('path');
const router = express.Router();
router.post("/verify/mail/", (req, res) => {
  req.body.email
    ? res
      .status(200)
      .json({ email: req.body.email, validiter: vE(req.body.email) })
    : res.status(403).json({ msg: "Veuillez preciser une email a vérifiér" });
});

router.post("/verify/tel/", (req, res) => {
  req.body.tel
    ? res.status(200).json({ tel: req.body.tel, validiter: tel.cameroon(req.body.tel) })
    : res
      .status(403)
      .json({ error: "Veuillez preciser un numeros de tel  a verifier" });
});
router.post("/confirm/email/", (req, res) => {
  if (!req.body.API_KEY || !req.body.email || !req.body.object) {
    res.status(422).json({ error: true, msg: "Veuillez bien construire le body de votre requête car elle n'est pas complète" })
  } else {
    if (auth(req.body.API_KEY)) {
      let main = sendMail(req.body.email, req.body.object)
      !main ? res.status(400).json({ error: true, msg: "L'objet de votre requête n'est pas définié. Veuillez consulter la documentation ou contacter le develloppeur via le +237621092130" }) : res.status(201).json({ error: false, msg: `Code de confirmation envoyé avec succèss a ${req.body.email}`, code: main })
    } else {
      res.status(401).json({ error: true, msg: "L'API_KEY que vous avez entrer n'ai pas correct" })
    }
  }
})
router.post("/new_publication", (req, res) => {
  const Key = req.headers["x-api_key"]
  if (!Key) {
    res.status(401).json({ error: true, msg: "Veuillez preciser votre clé api et réesayez" })
  } else if (!keys.includes(Key)) {
    res.status(403).json({ error: true, msg: "Votre clé API est invalide. Corrigez la puis réesayez" })
  } else if (!req.body.auth || !req.body.pub) {
    res.status(406).json({ error: true, msg: "Veuillez completer les information pour la creation d'une publication" })
  } else {
    publications.create({
      auth: req.body.auth,
      pub: req.body.pub,
      stat: { "nbr_like": 0, "nbr_com": 0, "nbr_par": 0 },
      comments: []
    })
    res.status(201).json({ error: false, msg: "Publication ajouter avec success" })
  }
})
router.post('/publications/user', (req, res) => {
  if (!req.body.nom || !req.body.profil) {
    res.status(400).json({ error: true, msg: "Veuillez mentionner toutes les donnee puis réesayez" })
  } else {
    let publicationOfUser = getPubOfUser(req.body.profil, req.body.nom)
    publicationOfUser !== false ? res.status(200).json(publicationOfUser) : res.status(404).json({ error: true, msg: "Aucun utilisateur trouver avec les données que vous avez preciser" })
  }
})
router.post('/messages/add', (req, res) => {
  const Key = req.headers["x-api_key"]
  if (!Key) {
    res.status(401).json({ error: true, msg: "Veuillez preciser votre clé api et réesayez" })
  } else if (!keys.includes(Key)) {
    res.status(403).json({ error: true, msg: "Votre clé API est invalide. Corrigez la puis réesayez" })
  } else if (!req.body.par || !req.body.pour || !req.body.contenue || !req.body.type) {
    res.status(416).json({ error: true, msg: "Le body de votre requête est incomplète. Veuillez à y mentionner l'Id de la publication et le noouveau commentaire"})
  } else {
    let date_Actuel = new Date()
    let date = {
      jour: date_Actuel.getDate(),
      mois: date_Actuel.getMonth(),
      heure: date_Actuel.getHours(),
      minute: date_Actuel.getMinutes()
    }
    let par=req.body.par
    let pour=req.body.pour
    if (isNaN(par) || isNaN(pour)) {
      res.status(400).json({error:true, msg:"Veuillez preciser des nombres réels aux endroit requis.  Si vous avez des doutes, Fiellez vous a la documentation."})
    } else {
      messages.create({
        type: req.body.type,
        par: req.body.par,
        pour: req.body.pour,
        date,
        valeur: req.body.contenue
      })
      res.status(201).json({error:false,msg:"Message envoyé avec succès !"})
    }
  }
})



// Route pour le téléversement de fichiers audio
router.post('/message/add/audio', upload.single('audioFile'), (req, res) => {
  if (!req.file) {
      return res.status(400).send('Aucun fichier audio n\'a été envoyé.');
  }else{
    let date_Actuel = new Date()
    let date = {
      jour: date_Actuel.getDate(),
      mois: date_Actuel.getMonth(),
      heure: date_Actuel.getHours(),
      minute: date_Actuel.getMinutes()
    }
    let par=req.body.par
    let pour=req.body.pour
    if (isNaN(par) || isNaN(pour)) {
      res.status(400).json({error:true, msg:"Veuillez preciser des nombres réels aux endroit requis.  Si vous avez des doutes, Fiellez vous a la documentation."})
    } else {
      messages.create({
        type: "audio",
        par: req.body.par,
        pour: req.body.pour,
        date,
        valeur: req.file.filename
      })
      res.status(200).send(`Fichier ${req.file.filename} enregistré avec succès.`);
  }
  }
});

module.exports = router;
