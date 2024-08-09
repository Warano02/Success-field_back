module.exports = (sequelize, DataTypes) => {
    return sequelize.define('porfolio',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nom: {
                allowNull: false,
                type: DataTypes.STRING
            },
            tel:{
                allowNull: false,
                type:DataTypes.STRING
            },
            email:{
                allowNull: false,
                type:DataTypes.INTEGER
            },
            projet:{
                allowNull: false,
                type:DataTypes.INTEGER
            },
            message:{
                allowNull: false,
                type:DataTypes.JSON
            }
        }
        , {
            timestamps: true,
            createdAt: 'created',
            updatedAt: false
        });
}