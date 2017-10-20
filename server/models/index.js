'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const config = require('../config');

const db = {};
const sequelize = new Sequelize(config.postgres.database, config.postgres.user, config.postgres.password, {
    host: "localhost",
    dialect: 'postgres'
});

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function (file) {
        let model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

db.Student.belongsTo(db.Location, {foreignKey: 'location_id', targetKey: 'id', constraints: false});
db.Location.hasMany(db.Student, {foreignKey: 'location_id', targetKey: 'id', constraints: false});

db.Student.belongsTo(db.Grade, {foreignKey: 'grade_id', targetKey: 'id', constraints: false});
db.Grade.hasMany(db.Student, {foreignKey: 'grade_id', targetKey: 'id', constraints: false});

db.Student.hasMany(db.Family, {foreignKey: 'student_id', targetKey: 'student_id', constraints: false});
db.Family.belongsTo(db.Parent, {foreignKey: 'parent_id', targetKey: 'id', constraints: false});

db.sequelize = sequelize;
db.sequelize.sync();

db.Sequelize = Sequelize;

module.exports = db;