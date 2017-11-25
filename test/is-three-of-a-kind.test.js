'use strict';

const data = require('./data');
const expect = require('expect.js');
const isThreeOfAKind = require('../lib/is-three-of-a-kind');

describe('is-three-of-a-kind', function () {
    it('should return true when hand is a three of a kind', function () {
        data.THREEOFAKIND.forEach((testcase) => {
            expect(isThreeOfAKind(testcase.cards)).to.eql(testcase.result);
        });
    });
    it('should return false when hand is not a three of a kind', function () {
        Object.keys(data).filter((key) => key !== 'THREEOFAKIND').forEach((key) => {
            data[key].forEach((testcase) => {
                expect(isThreeOfAKind(testcase.cards)).to.be(false);
            });
        });
    });
});
