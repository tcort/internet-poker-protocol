'use strict';

const data = require('./data');
const expect = require('expect.js');
const isHighCard = require('../lib/is-high-card');

describe('is-high-card', function () {
    it('should return true when hand is a high card', function () {
        data.HIGHCARD.forEach((testcase) => {
            expect(isHighCard(testcase.cards)).to.eql(testcase.result);
        });
    });
    it('should return false when hand is not a high card', function () {
        Object.keys(data).filter((key) => key !== 'HIGHCARD').forEach((key) => {
            data[key].forEach((testcase) => {
                expect(isHighCard(testcase.cards)).to.be(false);
            });
        });
    });
});
