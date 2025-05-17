const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('should correctly read a whole number input', function () {
        assert.isNumber(convertHandler.getNum("1"), 'should be a positive number')
    });

    test('should correctly read a decimal number input', function () {
        assert.isNumber(convertHandler.getNum('3.141516'))
    })

    test('should correctly read a fractional input', function () {
        assert.isNumber(convertHandler.getNum('1/2'))
    })

    test('should correctly read a fractional input with a decimal', function () {
        assert.isNumber(convertHandler.getNum('1/2.2'))
    })

    test('should correctly return an error on a double-fraction (i.e. 3/2/3)', function () {
        assert.equal(convertHandler.getNum('1/2/2'), 'invalid number')
    })

    test('should correctly default to a numerical input of 1 when no numerical input is provided', function () {
        assert.equal(convertHandler.convert('kg'), 2.20462, 'should be 1kg equal to 2.20462lbs')
    })

    test('should correctly read each valid input unit', function () {
        assert.notEqual(convertHandler.getUnit('kg'), 'invalid unit')
    })

    test('should correctly return an error for an invalid input unit', function () {
        assert.equal(convertHandler.getUnit('kgs'), 'invalid unit')
    })

    test('should return the correct return unit for each valid input unit', function () {
        assert.equal(convertHandler.getUnit('kg'), 'kg')
    })

    test('should correctly return the spelled-out string unit for each valid input unit', function () {
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilogram')
    })

    test('should correctly convert gal to L', function () {
        assert.equal(convertHandler.getReturnUnit('gal'), 'L')
    })

    test('should correctly convert L to gal', function () {
        assert.equal(convertHandler.getReturnUnit('L'), 'gal')
    })

    test('should correctly convert mi to km', function () {
        assert.equal(convertHandler.getReturnUnit('mi'), 'km')
    })

    test('should correctly convert km to mi', function () {
        assert.equal(convertHandler.getReturnUnit('km'), 'mi')
    })

    test('should correctly convert lbs to kg', function () {
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg')
    })

    test('should correctly convert kg to lbs', function () {
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs')
    })
});