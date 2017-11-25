'use strict';

const data = require('./data');
const expect = require('expect.js');
const isOnePair = require('../lib/is-one-pair');

describe('is-one-pair', function () {
    it('should return true when hand is one pair', function () {
        data.ONEPAIR.forEach((testcase) => {
            expect(isOnePair(testcase.cards)).to.eql(testcase.result);
        });
    });
    it('should return false when hand is not one pair', function () {
        Object.keys(data).filter((key) => key !== 'ONEPAIR').forEach((key) => {
            data[key].forEach((testcase) => {
                expect(isOnePair(testcase.cards)).to.be(false);
            });
        });
    });
});
