module.exports = function (sequelize, DataTypes) {
    var Student = sequelize.define('Student', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        grade_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        grade_entered: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        date_of_birth: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zip: {
            type: DataTypes.STRING,
            allowNull: false
        },
        heard_from: {
            type: DataTypes.STRING,
            allowNull: false
        },
        heard_from_other: {
            type: DataTypes.STRING,
            allowNull: true
        },
        purpose: {
            type: DataTypes.STRING,
            allowNull: true
        },
        active: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
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
            type: DataTypes.BIGINT,
            allowNull: false
        },
        start_date: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        modified_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'staff',
                key: 'id'
            }
        },
        modified_date: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        referred_by: {
            type: DataTypes.STRING,
            allowNull: true
        },
        location_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'location',
                key: 'id'
            }
        },
        enrichment_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'student',
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
    return Student;
};
