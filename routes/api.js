'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res) {
    const input = req.query.input

    const { num, unit } = convertHandler.splitInput(input)
    const returnNum = convertHandler.convert(unit, num)
    const returnUnid = convertHandler.getReturnUnit(unit)
    const returnUntString = convertHandler.spellOutUnit(returnUnid)
    const stringResult = convertHandler.getString(num, unit, returnNum, returnUntString)


    if (num === 'invalid number' && returnUnid === 'invalid unit') {
      res.send('invalid number and unit')
    } else if (Number.isNaN(returnNum) || num === 'invalid number') {
      res.send('invalid number')
    } else if (unit === 'invalid unit') {
      res.send('invalid unit')
    } else {
      res.json({
        "initNum": num,
        "initUnit": unit,
        "returnNum": returnNum,
        "returnUnit": returnUnid,
        "string": stringResult
      })
    }
  })
};