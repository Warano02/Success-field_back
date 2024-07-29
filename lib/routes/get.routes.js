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

module.exports = router