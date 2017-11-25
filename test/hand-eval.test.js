'use strict';

const Deck = require('deckofcards').Deck;
const expect = require('expect.js');
const handEval = require('../lib/hand-eval');

describe('hand-eval', function () {

    // skipped due to how time consuming it is (takes over a minute on a fast machine)
    it.skip('should enumerate all possible hands and find the right number of each type of hand', function () {

        this.timeout(3 * 60 * 1000); // 3 minutes

        const N = 52;
        const R = 5;

        const counts = {
            STRAIGHTFLUSH: 0,
            FOUROFAKIND: 0,
            FULLHOUSE: 0,
            FLUSH: 0,
            STRAIGHT: 0,
            THREEOFAKIND: 0,
            TWOPAIR: 0,
            ONEPAIR: 0,
            HIGHCARD: 0,
        };

        const deck = new Deck();
        let cards = [];

        for (let a = 0; a < N - R + 1; a++) {
            for (let b = a + 1; b < N - R + 2; b++) {
                for (let c = b + 1; c < N - R + 3; c++) {
                    for (let d = c + 1; d < N - R + 4; d++) {
                        for (let e = d + 1; e < N - R + 5; e++) {
                            cards[0] = deck.cards[a];
                            cards[1] = deck.cards[b];
                            cards[2] = deck.cards[c];
                            cards[3] = deck.cards[d];
                            cards[4] = deck.cards[e];
                            counts[handEval(cards).hand]++;
                        }
                    }
                }
            }
        }

        expect(counts).to.eql({
            STRAIGHTFLUSH: 40,
            FOUROFAKIND: 624,
            FULLHOUSE: 3744,
            FLUSH: 5108,
            STRAIGHT: 10200,
            THREEOFAKIND: 54912,
            TWOPAIR: 123552,
            ONEPAIR: 1098240,
            HIGHCARD: 1302540
        });
    });
});
