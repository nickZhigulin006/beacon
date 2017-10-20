const chai = require('chai')
const should = chai.should();
const chaiHttp = require('chai-http');


chai.use(chaiHttp);
describe('GET /api/student', function () {

    it('should show all students', function (done) {
        chai.request('http://localhost:3000')
            .get('/api/student')
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done()
            });
    });
});
const data = {
    data: {
        first_name: "Joe",
        last_name: "Doe",
        grade_id: '7',
        street1: '6',
        street2: 'Windsong Circle',
        heard_from: "Walk In",
        date_of_birth: '01-24-2011',
        city: "East Brunswick",
        state: "NJ",
        zip: "08816",
        enrichment_id: '1',
        first_name1: "Henry",
        last_name1: "Doe",
        parent_cell_no_1: "917-545-7449",
        parent_email_1: "amal6279@yahoo.com",
        first_name2: "Alise",
        last_name2: "Doe",
        parent_cell_no_2: "917-545-7449",
        parent_email_2: "alisel6279@yahoo.com",
    }

}

describe('POST api/student', function () {
    function getStudent(array, first_name, last_name, grade_id) {
        let i = array.length;
        while (i--) {
            if ((array[i].first_name === first_name)&&(array[i].last_name === last_name)&&(array[i].grade_id === grade_id)) {
                return array[i];
            }
        }

    }
    it('should create one student', function (done) {
        chai.request('http://localhost:3000')
            .post('/api/student')
            .send(data)
            .end(function (err, res) {
                res.should.have.status(200);
                chai.request('http://localhost:3000')
                    .get('/api/student')
                    .end(function (err, res) {
                        var last = res.body.length - 1;
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        getStudent(res.body, 'Joe', 'Doe', 7)
                        done();
                    });


            });
    });
});

