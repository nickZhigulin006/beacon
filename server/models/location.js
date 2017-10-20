module.exports = function (sequelize, DataTypes) {
    var Location = sequelize.define('Location', {
        short_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        long_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        street: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        zip: {
            type: DataTypes.STRING,
            allowNull: true
        },
        manager_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'staff',
                key: 'id'
            }
        }
    }, {
        tableName: 'location',
        timestamps: false
    });
    return Location;
};
