module.exports = function (sequelize, DataTypes) {
    var Parent = sequelize.define('Parent', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cell_phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        home_phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        alternate_phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'staff',
                key: 'id'
            }
        },
        create_date: {
            type: DataTypes.TIME,
            allowNull: false
        },
        modified_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'staff',
                key: 'id'
            }
        },
        modified_date: {
            type: DataTypes.TIME,
            allowNull: true
        },
        profession: {
            type: DataTypes.STRING,
            allowNull: true
        },
        race: {
            type: DataTypes.STRING,
            allowNull: true
        },
        homeowner_renter: {
            type: DataTypes.STRING,
            allowNull: true
        },
        persona: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'parent',
        timestamps: false,
        getterMethods: {
            fullName: function () {
                return this.getDataValue('first_name') + ' ' + this.getDataValue('last_name')
            }
        },
        setterMethods: {
            fullName: function (value) {
                var parts = value.split(' ')

                this.setDataValue('last_name', parts[parts.length - 1])
                this.setDataValue('first_name', parts[0]) // this of course does not work if the user has several first names
            }
        }
    });
    return Parent;
};
