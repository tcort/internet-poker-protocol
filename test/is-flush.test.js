'use strict';

const data = require('./data');
const expect = require('expect.js');
const isFlush = require('../lib/is-flush');

describe('is-flush', function () {
    it('should return true when hand is a flush', function () {
        data.FLUSH.forEach((testcase) => {
            expect(isFlush(testcase.cards)).to.eql(testcase.result);
        });
    });
    it('should return false when hand is not a flush', function () {
        Object.keys(data).filter((key) => key !== 'FLUSH').forEach((key) => {
            data[key].forEach((testcase) => {
                expect(isFlush(testcase.cards)).to.be(false);
            });
        });
    });
});
