'use strict';
const models = require('../../models/index');

const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

let response = {
    status: 200,
    data: [],
    message: null
};

function index(req, res) {
    models.Student.findAll({
        attributes: ['first_name', 'last_name', 'grade_id', 'location_id', 'create_date', 'start_date'],
        include: [{model: models.Grade},
            {model: models.Location},
            {
                model: models.Family,
                include: [{
                    model: models.Parent,
                    attributes: ['first_name', 'last_name', 'cell_phone', 'email'],
                }]
            }
        ]
    }).then((test) => {
        res.send(test)
    }).catch((err) => sendError(err, res))
}

async function create(req, res) {

    if (!req.body.data.first_name1 || !req.body.data.last_name1 || !req.body.data.parent_cell_no_1 || !req.body.data.parent_email_1
        || !req.body.data.first_name2 || !req.body.data.last_name2 || !req.body.data.parent_cell_no_2 || !req.body.data.parent_email_2
        || !req.body.data.first_name || !req.body.data.last_name || !req.body.data.grade_id || !req.body.data.date_of_birth
        || !req.body.data.street1 || !req.body.data.zip || !req.body.data.state || !req.body.data.city || !req.body.data.heard_from ||!req.body.data.enrichment_id
    ) return res.sendStatus(400);

    const student = {
        first_name: req.body.data.first_name,
        last_name: req.body.data.last_name,
        grade_id: +req.body.data.grade_id,
        grade_entered: req.body.data.grade_id,
        street: req.body.data.street1 + req.body.data.street2,
        heard_from:  +req.body.data.heard_from,
        enrichment_id:  +req.body.data.enrichment_id,
        city: req.body.data.city,
        zip: req.body.data.zip,
        state: req.body.data.state,
        date_of_birth: (new Date(req.body.data.date_of_birth).getTime()),
        active: true,
        status: 1,
        created_by: 1,
        create_date: Date.now(),
        modified_by: 1,
        modified_date: Date.now(),
        location_id: 1,
    };

    const parent1 = {
        first_name: req.body.data.first_name1,
        last_name: req.body.data.last_name1,
        cell_phone: req.body.data.parent_cell_no_1,
        email: req.body.data.parent_email_1,
        created_by: 1,
        create_date: Date.now()
    };

    const parent2 = {
        first_name: req.body.data.first_name2,
        last_name: req.body.data.last_name2,
        cell_phone: req.body.data.parent_cell_no_2,
        email: req.body.data.parent_email_2,
        created_by: 1,
        create_date: Date.now()
    };

    let t = await models.sequelize.transaction();

    try {

        let [_student, _parent1, _parent2] = await Promise.all(
            [models.Student.create(student, {transaction: t}),
                models.Parent.create(parent1, {transaction: t}),
                models.Parent.create(parent2, {transaction: t})]
        );
        await Promise.all([
            models.Family.create({parent_id: _parent1.id, student_id: _student.id}, {transaction: t}),
            models.Family.create({parent_id: _parent2.id, student_id: _student.id}, {transaction: t})
        ])

        t.commit();
        res.sendStatus(200)
    } catch (err) {
        t.rollback();
        sendError(err, res)
    }
};

module.exports = {index, create};
