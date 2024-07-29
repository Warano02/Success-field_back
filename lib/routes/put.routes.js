const express = require("express");
const {  publications } = require("../config/db");
const router = express.Router();
//adjouter un nouveau commentaire a un e publication

router.put("/add_new_comment", (req, res) => {
  if (!req.body.id|| !req.body.comment ) {
    res.status(416).json({ error: true, msg: "Le body de votre requête est incomplète. Veuillez à y mentionner l'Id de la publication et le noouveau commentaire" })
  } else {
    const Id = req.body.id
    publications.findByPk(Id).then((data) => {
      data.comments.push(req.body.comment)
      data.stat.nbr_com = data.stat.nbr_com + 1
      publications.update({ comments: data.comments, stat: data.stat }, {
        where: { id: Id }
      }).then((_) => res.status(202).json({ error: false, msg: `Nouveau commentaire ajouter avec succces. Nouveau_Nombre de commentaire ${data.stat.nbr_com}` }))

    }).catch(() => res.status(404).json({ error: true, msg: "Aucune publication avec l'id que vous avez mentionner <" + Id + ">" }))

  }
})

module.exports = router;
