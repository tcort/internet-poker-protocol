'use strict';

const data = require('./data');
const expect = require('expect.js');
const isStraightFlush = require('../lib/is-straight-flush');

describe('is-straight-flush', function () {
    it('should return true when hand is a straight flush', function () {
        data.STRAIGHTFLUSH.forEach((testcase) => {
            expect(isStraightFlush(testcase.cards)).to.eql(testcase.result);
        });
    });
    it('should return false when hand is not a straight flush', function () {
        Object.keys(data).filter((key) => key !== 'STRAIGHTFLUSH').forEach((key) => {
            data[key].forEach((testcase) => {
                expect(isStraightFlush(testcase.cards)).to.be(false);
            });
        });
    });
});
