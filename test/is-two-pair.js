'use strict';

const data = require('./data');
const expect = require('expect.js');
const isTwoPair = require('../lib/is-two-pair');

describe('is-two-pair', function () {
    it('should return true when hand is two pair', function () {
        data.TWOPAIR.forEach((testcase) => {
            expect(isTwoPair(testcase.cards)).to.eql(testcase.result);
        });
    });
    it('should return false when hand is not two pair', function () {
        Object.keys(data).filter((key) => key !== 'TWOPAIR').forEach((key) => {
            data[key].forEach((testcase) => {
                expect(isTwoPair(testcase.cards)).to.be(false);
            });
        });
    });
});
