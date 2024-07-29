const express = require("express");
const Bodyparser=require('body-parser')
const app = express();
const cors = require("cors")
const { initDb } = require("./lib/config/db");
const port = process.env.PORT || 3000
app
  .use(cors())
  .use(Bodyparser.json())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(express.Router())
  .use("/post", require("./lib/routes/post.routes"))
  .use("/put", require("./lib/routes/put.routes"))
  .use("/get", require("./lib/routes/get.routes"))
  .use("/patch", require("./lib/routes/patch.routes"))
  .use("", (req, res) => res.status(404).json({ error: true, msg: "Aucune routes trouver tel que que vous avez mentionner. Verifier la en consultant la documentation ou Modifier  et réesayer" }))

app.get("/",(req,res)=>res.json({message:"Bienvenue sur l'api de Notre projet Success-fields"}))


initDb()


app.listen(port, () =>
  console.log("L'api est lancer sur http://localhost:" + port)
);
