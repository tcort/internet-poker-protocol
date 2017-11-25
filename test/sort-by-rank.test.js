'use strict';

const Card = require('deckofcards').Card;
const expect = require('expect.js');
const sortByRank = require('../lib/sort-by-rank');

describe('sort-by-rank', function () {
    it('should sort cards', function () {
        const unsorted = [
            new Card('A', 'C'),
            new Card('4', 'C'),
            new Card('T', 'C'),
            new Card('3', 'C'),
            new Card('6', 'C'),
        ];
        const sorted = sortByRank(unsorted).map((c) => Card.stringify(c));
        expect(sorted).to.eql(['AC','TC','6C','4C','3C']);
    });
});
