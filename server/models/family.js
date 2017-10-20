module.exports = function (sequelize, DataTypes) {
    var Family = sequelize.define('Family', {
        relationship: {
            type: DataTypes.STRING,
            allowNull: true
        },
        parent_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'parent',
                key: 'id'
            }
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'student',
                key: 'id'
            }
        }
    }, {
        tableName: 'family',
        timestamps: false
    });
    return Family;
};
