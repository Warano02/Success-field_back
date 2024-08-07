const { Sequelize, DataTypes } = require("sequelize")
const publicationModel = require("./models/publication")
const messageModel=require('./models/message')
const citationModel=require('./models/citation')
const sequelize = new Sequelize("proet", "root", "",
  {
    host: "localhost",
    dialect: "mariadb",
    logging: false
  }
)
sequelize.authenticate()
  .then((_) => console.log("La connexion a la bd a ete reussis"))
  .catch((err) => console.log("Une erreure est survenue lors de la connexion a la base de donnee" + err))

const publications = publicationModel(sequelize, DataTypes)
const messages=messageModel(sequelize,DataTypes)
const citations=citationModel(sequelize,DataTypes)
const initDb=()=>{
  return sequelize.sync()
  .then((_) => {
    console.log("La base de donnee a été synchroniser avec nos table");
  })
}

module.exports={initDb,publications,sequelize,messages,citations}

