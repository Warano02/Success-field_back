const express = require("express");
const { sequelize, publications } = require("../config/db");
const Hours = require("../helper/function/minuteOrHours");
const router = express.Router()

router.get('/publications/', (req, res) => {
    let result = []
    let r = []
    if (req.query.id) {
        const Id = parseInt(req.query.id)
        publications.findAll({
            where: { id: Id }
        })
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
            res.status(200).setHeader("CORS", "Access-Control-Allow-Origin").json(result)
        }).catch(() => res.status(500).json({ error: true, msg: "Une erreur est survenue lors de la recuperation des publication. Réeseayer dans quelques instant" }))
    }


})
router.get("/publications/user/:nom/:profil", (req, res) => {
    if (!req.params.nom || !req.params.profil) {
        res.status(431).json({ error: true, msg: "Votre requête est incoplète. L'erreur pourais provenir de la mauvaise configuration de votre requête. Rassurez vous que vous envoyez bien du json puis réesayez" })
    } else {
        publications.findAll().then(publications => {
            const brutes = [...publications.filter(pub => pub.auth.nom == req.params.nom && pub.auth.profil == req.params.profil)]
            if (brutes.length >= 1) {
                let result = []
                let r = []
                brutes.forEach(Actual_data => {
                    let pub = Actual_data.pub
                    let comments = Actual_data.comments
                    pub.heure = Hours(pub.heure)
                    comments.forEach(comment => {
                        comment.heure = Hours(comment.heure);
                    });
                    r.push(Actual_data.id, Actual_data.auth, pub, Actual_data.stat, comments)
                    result.push(r)
                    r = []
                })
                res.status(200).json(result)
            } else {
                res.status(404).json({ error: true, msg: "Aucun utilisateur avec les donnee que vous avez mentionner" })
            }
        })

    }
})

module.exports = router