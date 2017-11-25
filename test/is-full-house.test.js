'use strict';

const data = require('./data');
const expect = require('expect.js');
const isFullHouse = require('../lib/is-full-house');

describe('is-full-house', function () {
    it('should return true when hand is a full house', function () {
        data.FULLHOUSE.forEach((testcase) => {
            expect(isFullHouse(testcase.cards)).to.eql(testcase.result);
        });
    });
    it('should return false when hand is not a full house', function () {
        Object.keys(data).filter((key) => key !== 'FULLHOUSE').forEach((key) => {
            data[key].forEach((testcase) => {
                expect(isFullHouse(testcase.cards)).to.be(false);
            });
        });
    });
});
