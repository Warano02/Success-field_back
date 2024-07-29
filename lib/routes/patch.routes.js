const express = require("express");
const { sequelize, publications } = require("../config/db");
const router = express.Router();

router.patch("/likes_update/:id", (req, res) => {
    const id = parseInt(req.params.id)
    sequelize.sync()
        .then(() => {
            return publications.findByPk(id)
                .then((data) => {
                    data.stat.nbr_like++
                    publications.update({ stat: data.stat }, {
                        where: { id }
                    }).then(() => res.status(202).json({ error: false, msg: "Likes ajouter avec success. Le nouveau nombre de like est " + data.stat.nbr_like }))
                })
        }).catch((err) => res.status(400).json({ error: true, msg: "L'id de la publication que vous avez entrer n'existe pas ou n'existe plus. Veuillez réesayer avec un Id valid " + err }))
})

router.patch("/share_update/:id",(req,res)=>{
    const id=parseInt(req.params.id)
    return publications.findByPk(id)
    .then((data)=>{
        data.stat.nbr_par++
        publications.update({stat:data.stat},{
            where:{id}
        }).then(()=>res.status(202).json({error:false,msg:"Nombres de partages mis a jours avec succès. Nouveau nombre de partage "+data.stat.nbr_par}))
    }).catch((err)=>res.status(400).json({error:true,msg:"L'id de la publication que vous avez mentioner n'existe pas. veuillez modifier puis réesayer."}))
})


module.exports = router