module.exports = function (sequelize, DataTypes) {
    var Grade = sequelize.define('Grade', {

        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        grade_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'grade',
        timestamps: false
    });
    return Grade;
};
