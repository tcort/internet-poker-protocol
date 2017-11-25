'use strict';

const data = require('./data');
const expect = require('expect.js');
const isStraight = require('../lib/is-straight');

describe('is-straight', function () {
    it('should return true when hand is a straight', function () {
        data.STRAIGHT.forEach((testcase) => {
            expect(isStraight(testcase.cards)).to.eql(testcase.result);
        });
    });
    it('should return false when hand is not a straight', function () {
        Object.keys(data).filter((key) => key !== 'STRAIGHT').forEach((key) => {
            data[key].forEach((testcase) => {
                expect(isStraight(testcase.cards)).to.be(false);
            });
        });
    });
});
