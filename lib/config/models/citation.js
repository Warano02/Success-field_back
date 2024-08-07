module.exports = (sequelize, DataTypes) => {
    return sequelize.define('citation',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            citation:{
                allowNull: false,
                type:DataTypes.STRING
            },
            auteur:{
                allowNull: false,
                type:DataTypes.STRING
            }
        }
        , {
            timestamps: true,
            createdAt: 'created',
            updatedAt: false
        });
}