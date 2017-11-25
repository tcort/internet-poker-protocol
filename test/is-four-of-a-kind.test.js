'use strict';

const data = require('./data');
const expect = require('expect.js');
const isFourOfAKind = require('../lib/is-four-of-a-kind');

describe('is-four-of-a-kind', function () {
    it('should return true when hand is a four of a kind', function () {
        data.FOUROFAKIND.forEach((testcase) => {
            expect(isFourOfAKind(testcase.cards)).to.eql(testcase.result);
        });
    });
    it('should return false when hand is not a four of a kind', function () {
        Object.keys(data).filter((key) => key !== 'FOUROFAKIND').forEach((key) => {
            data[key].forEach((testcase) => {
                expect(isFourOfAKind(testcase.cards)).to.be(false);
            });
        });
    });
});
