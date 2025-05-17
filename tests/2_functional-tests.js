const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const API_PATH = '/api/convert'

suite('Functional Tests', function () {
    test('Convert a valid input such as 10L', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get(`${API_PATH}?input=10L`)
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.isObject(res.body)
                assert.equal(res.body.initUnit, 'L')
                assert.equal(res.body.returnUnit, 'gal')
                done()
            })
    })

    test('Convert an invalid input such as 32g', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get(`${API_PATH}?input=32g`)
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.isNotNull(res.text)
                assert.equal(res.text, 'invalid unit')
                done()
            })
    })

    test('Convert an invalid number such as 3/7.2/4kg', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get(`${API_PATH}?input=3/7.2/4kg`)
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.isNotNull(res.text)
                assert.equal(res.text, 'invalid number')
                done()
            })
    })

    test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get(`${API_PATH}?input=3/7.2/4kilomegagram`)
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.isNotNull(res.text)
                assert.equal(res.text, 'invalid number and unit')
                done()
            })
    })

    test('Convert with no number such as kg', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get(`${API_PATH}?input=kg`)
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.isObject(res.body)
                assert.equal(res.body.initNum, 1)
                assert.include(res.body.string, 'kilograms')
                done()
            })

    })
});

// {
//     initNum: 10,
//     initUnit: 'L',
//     returnNum: 2.64172,
//     returnUnit: 'gal',
//     string: '10 liters converts to 2.64172 gallons'
//   }
