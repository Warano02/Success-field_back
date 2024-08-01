const express = require("express");
const { tel, vE, sendMail } = require("../controllers/post.controler");
const auth = require("../SECURITY");
const { sequelize, publications, status } = require("../config/db");
const { getPubOfUser } = require("../controllers/get.contoler");
const router = express.Router();
//Verification de la validiter d'une email
router.post("/verify/mail/", (req, res) => {
  req.body.email
    ? res
      .status(200)
      .json({ email: req.body.email, validiter: vE(req.body.email) })
    : res.status(403).json({ msg: "Veuillez preciser une email a vérifiér" });
});
//Verification de la validiter d'un numeros de telephone

router.post("/verify/tel/", (req, res) => {
  req.body.tel
    ? res.status(200).json({ tel: req.body.tel, validiter: tel.cameroon(req.body.tel) })
    : res
      .status(403)
      .json({ error: "Veuillez preciser un numeros de tel  a verifier" });
});

//emvoi du code de verifiaction
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

//Creation d'une nouvelle publication pour le reseaux social
router.post("/new_publication", (req, res) => {
  if (!req.body.auth || !req.body.pub) {
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

// Creation d'un nouveau status
router.post("/new_status", (req, res) => {
  if (req.body.auth == undefined || req.body.src == undefined) {
    res.status(416).json({ error: true, msg: "Nombre de paramettre insufisant. Consulter la documentation pour voir la forme correct de la requête et réesayer " })
  } else {
    let auteur = req.body.auth
    if (!auteur.UnId || !auteur.nom) {
      res.status(204).json({ error: true, msg: "Veuillez bien remplire les données de celui qui publie et réesayer " })
    } else {
      status.findAll({
        where: { src: req.body.src }
      }).then((data) => {
        if (data.length - 1 < 0) {
          res.status(423).json({ error: true, msg: "Cette utilisateur a déjà un satuts en cours. Veuillez réesayer dans 24h" })
        } else {
          status.create({ src: req.body.src, auth: auteur, date: `${new Date().getHours()}-${new Date().getMinutes()}` }).then(() => res.status(201).json({ error: false, msg: "Status mis a jours avec succès" })).catch(() => res.status(500).json({ error: true, msg: "Une erreu est survenue de notre côté lors de la mise à jours du status. Veuillez réesayer dans quelques minutes " }))
        }
      })
    }
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
module.exports = router;
