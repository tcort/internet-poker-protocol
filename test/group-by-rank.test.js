'use strict';

const Card = require('deckofcards').Card;
const expect = require('expect.js');
const groupByRank = require('../lib/group-by-rank');

describe('group-by-rank', function () {
    it('should group cards', function () {
        const grouped = groupByRank([
            new Card('A', 'C'),
            new Card('4', 'C'),
            new Card('T', 'C'),
            new Card('T', 'D'),
            new Card('6', 'C'),
        ]);
        expect(grouped).to.have.length(4);
        expect(grouped[0][0]).to.be('T');
        expect(grouped[0][1]).to.have.length(2);
        expect(grouped[1][0]).to.be('A');
        expect(grouped[1][1]).to.have.length(1);
        expect(grouped[2][0]).to.be('6');
        expect(grouped[2][1]).to.have.length(1);
        expect(grouped[3][0]).to.be('4');
        expect(grouped[3][1]).to.have.length(1);
    });

    it('should order groups by rank', function () {
        const grouped = groupByRank([
            new Card('3', 'C'),
            new Card('3', 'S'),
            new Card('T', 'C'),
            new Card('T', 'D'),
            new Card('6', 'C'),
        ]);
        expect(grouped).to.have.length(3);
        expect(grouped[0][0]).to.be('T');
        expect(grouped[0][1]).to.have.length(2);
        expect(grouped[1][0]).to.be('3');
        expect(grouped[1][1]).to.have.length(2);
        expect(grouped[2][0]).to.be('6');
        expect(grouped[2][1]).to.have.length(1);
    });

    it('should order groups by size', function () {
        const grouped = groupByRank([
            new Card('A', 'H'),
            new Card('A', 'C'),
            new Card('T', 'C'),
            new Card('T', 'D'),
            new Card('T', 'H'),
        ]);
        expect(grouped).to.have.length(2);
        expect(grouped[0][0]).to.be('T');
        expect(grouped[0][1]).to.have.length(3);
        expect(grouped[1][0]).to.be('A');
        expect(grouped[1][1]).to.have.length(2);
    });
});
