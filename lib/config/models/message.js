module.exports = (sequelize, DataTypes) => {
    return sequelize.define('mesage',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            type: {
                allowNull: false,
                type: DataTypes.STRING
            },
            valeur:{
                allowNull: false,
                type:DataTypes.STRING
            },
            par:{
                allowNull: false,
                type:DataTypes.INTEGER
            },
            pour:{
                allowNull: false,
                type:DataTypes.INTEGER
            },
            date:{
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