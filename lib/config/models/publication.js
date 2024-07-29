module.exports = (sequelize, DataTypes) => {
    return sequelize.define('publication',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            auth: {
                allowNull: false,
                type: DataTypes.JSON
            },
            pub: {
                allowNull: false,
                type: DataTypes.JSON,
            },
            stat: {
                allowNull: false,
                type: DataTypes.JSON,
            },
            comments: {
                allowNull: true,
                type:DataTypes.JSON
            }
        }
        , {
            timestamps: true,
            createdAt: 'created',
            updatedAt: false
        });
}