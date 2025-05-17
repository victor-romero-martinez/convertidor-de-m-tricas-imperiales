function ConvertHandler() {
  const UNID = {
    km: 'kilometer',
    mi: 'mile',
    kg: 'kilogram',
    lbs: 'pound',
    gal: 'gallon',
    l: 'liter'
  }

  this.getNum = function (input) {
    let result;

    if (/^\d+(\.\d+)?\/\d+(\.\d+)?$/.test(input)) {
      const aux = input.split('/')
      result = Number(aux[0]) / Number(aux[1])
    } else {
      result = Number(input);
    }

    return Number.isNaN(result) ? 'invalid number' : result;
  };

  this.getUnit = function (input) {
    const inputToLower = input.toLowerCase()
    
    if (input === 'l') return 'L'

    return (inputToLower in UNID) ? inputToLower : 'invalid unit';
  };

  this.getReturnUnit = function (initUnit) {
    const pairConvert = {
      km: 'mi',
      mi: 'km',
      kg: 'lbs',
      lbs: 'kg',
      gal: 'L',
      l: 'gal'
    }
    const result = pairConvert[initUnit.toLowerCase()]

    return result ? result : 'invalid unit'
  };

  this.spellOutUnit = function (unit) {
    if (!unit) return 'invalid unit'

    let result = UNID[unit.toLowerCase()];

    if (!result) return 'invalid unit'

    return result;
  };

  this.convert = function (initUnit, initNum = '1') {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const num = this.getNum(initNum)
    const unid = this.getUnit(initUnit)

    if (unid === 'gal') {
      return this.fixeNumber(galToL * num)
    } else if (unid.toLowerCase() === 'l') {
      return this.fixeNumber(num / galToL)
    } else if (unid === 'lbs') {
      return this.fixeNumber(lbsToKg * num)
    } else if (unid === 'kg') {
      return this.fixeNumber(num / lbsToKg)
    } else if (unid === 'mi') {
      return this.fixeNumber(miToKm * num)
    } else if (unid === 'km') {
      return this.fixeNumber(num / miToKm)
    }

    return 'invalid number'
  };

  this.fixeNumber = function (num) {
    return Number((num).toFixed(5))
  }

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${this.getNum(initNum)} ${this.spellOutUnit(initUnit)}s converts to ${returnNum} ${returnUnit}s`;

    return result;
  };

  this.splitInput = function (input) {
    let num = ''
    let unit = ''

    if (!input) return 'invalid unit'

    for (let i = 0; i < input.length; i++) {
      if (/[a-zA-Z]/.test(input[i])) {
        unit += input[i]
      } else {
        num += input[i]
      }
    }

    return { num: this.getNum(num ? num : '1'), unit: this.getUnit(unit) }
  }
}

module.exports = ConvertHandler;
