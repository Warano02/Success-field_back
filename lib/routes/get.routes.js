const express = require("express");
const { sequelize, publications, messages } = require("../config/db");
const Hours = require("../helper/function/minuteOrHours");
const router = express.Router()
const path = require("path");
const fs = require('fs')
const { keys } = require("../SECURITY/api.keys");
// recuperation d'une publication ou de toute les publications
router.get('/publications/', (req, res) => {
    let result = []
    let r = []
    if (req.query.id) {
        const Id = parseInt(req.query.id)
        publications.findAll({ where: { id: Id } })
            .then((data) => {
                if (data.length > 0) {
                    data.forEach(Actual_data => {
                        let pub = Actual_data.pub
                        let comments = Actual_data.comments
                        pub.heure = Hours(pub.heure)
                        comments.forEach(comment => {
                            comment.heure = Hours(comment.heure);
                        });
                        r.push(Actual_data.id, Actual_data.auth, pub, Actual_data.stat, comments)
                        result.push(r)
                        r = []
                    });
                    res.status(200).json(data)
                } else {
                    res.status(503).json({ error: true, msg: "Aucune publication avec l'identifiant que vous avez mentioner " + Id })
                }
            })
            .catch(() => res.status(404).json({ error: true, msg: "Aucune publication avec l'identifiant que vous avez mentioner " + Id }))
    } else {
        publications.findAll().then((data) => {
            data.forEach(Actual_data => {
                let pub = Actual_data.pub
                let comments = Actual_data.comments
                pub.heure = Hours(pub.heure)
                comments.forEach(comment => {
                    comment.heure = Hours(comment.heure);
                });
                r.push(Actual_data.id, Actual_data.auth, pub, Actual_data.stat, comments)
                result.push(r)
                r = []

            });
            data = []
            for (let index = result.length - 1; index > 0; index--) {
                const element = result[index];
                data.push(element)
            }
            result = data
            res.status(200).setHeader("CORS", "Access-Control-Allow-Origin").json(result)
        }).catch(() => res.status(500).json({ error: true, msg: "Une erreur est survenue lors de la recuperation des publication. Réeseayer dans quelques instant" }))
    }
})

router.get("/publications/user", (req, res) => {
    if (!req.query.profil) {
        res.status(400).json({ error: true, msg: "Veuillez preciser le profil de l'utilisateur que vous souhaitez voir les publications" })
    } else {
        let r = []
        let result = []
        const profil = req.query.profil
        publications.findAll().then((data) => {
            data.forEach(Actual_data => {
                let auth = Actual_data.auth
                let pub = Actual_data.pub
                let comments = Actual_data.comments
                if (auth.profil == profil) {
                    pub.heure = Hours(pub.heure)
                    comments.forEach(comment => {
                        comment.heure = Hours(comment.heure);
                    });
                    r.push(Actual_data.id, Actual_data.auth, pub, Actual_data.stat, comments)
                    result.push(r)
                    r = []
                }
            });
            result.length > 0 ? res.status(200).setHeader("CORS", "Access-Control-Allow-Origin").json(result) : res.status(400).json({ error: true, msg: `Aucun utilisateur n'as publier avec le profil ${profil}` })
        }).catch(() => res.status(500).json({ error: true, msg: "Une erreur est survenue lors de la recuperation des publication. Réeseayer dans quelques instant" }))

    }
})

router.get("/messages/:id/:id2", (req, res) => {
    const Key = req.headers["x-api_key"]
    if (!Key) {
        res.status(401).json({ error: true, msg: "Veuillez preciser votre clé api et réesayez" })
    } else if (!keys.includes(Key)) {
        res.status(403).json({ error: true, msg: "Votre clé API est invalide. Corrigez la puis réesayez" })
    } else if (!Number.isInteger(Number(req.params.id) || !Number.isInteger(Number(req.params.id2)))) {
        res.status(416).json({ error: true, msg: "Veuillez preciser un nombre entier au niveau de l'id puis réesayez!" })
    } else {
        let id = parseInt(req.params.id)
        let id2 = parseInt(req.params.id2)

        messages.findAll().then(allMessages => {
            let messageBrutes = []
            allMessages.forEach(message => {
                if ((message.par == id && message.pour == id2) || (message.par == id2 && message.pour == id)) {
                    messageBrutes.push(message)
                }
            });
            if (messageBrutes.length == 0) {
                res.status(200).json({ error: true, msg: "Les deux utilisateurs que vous avez mentionser n'ont pas encore eu de conversation." })
            } else {
                let tampon = []
                let filter = []
                messageBrutes.forEach(message => {
                    let date = message.date;
                    let details = `${date.mois}-${date.jour}-${date.heure}-${date.minute}`;
                    date = Hours(details);
                    message.date = date
                    let valeur = message.valeur
                    if (valeur == "audio") {
                        let filePath = path.join(__dirname, `../public/audio/${valeur}`)
                        fs.readFile(filePath, (err, data) => {
                            if (err) {
                                res.status(500).json({ error: true, msg: "Une erreur est survenue lors de la mise en forme de vos messags " })
                            } else {
                                valeur = data.toString("base64")
                                message.valeur = valeur
                            }
                        })
                        tampon.push(message)
                    } else {
                        tampon.push(message)
                    }
                });
                tampon.forEach(message => {
                    let moi = message.par == id
                    filter.push({ id: message.id, moi, valeur: message.valeur, date: message.date, type: message.type })
                });
                filter.sort((a, b) => b.id - a.id);
                res.status(200).json(filter)
            }

})











    }
})
module.exports = router