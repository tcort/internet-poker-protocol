'use strict';

const { Card, Deck } = require('deckofcards');
const data = require('./data');
const expect = require('expect.js');
const evaluator = require('../lib/evaluator');

const groupByRank = require('../lib/evaluator/group-by-rank');
const sortByRank = require('../lib/evaluator/sort-by-rank');

const isFlush = require('../lib/evaluator/is-flush');
const isFourOfAKind = require('../lib/evaluator/is-four-of-a-kind');
const isFullHouse = require('../lib/evaluator/is-full-house');
const isHighCard = require('../lib/evaluator/is-high-card');
const isOnePair = require('../lib/evaluator/is-one-pair');
const isStraightFlush = require('../lib/evaluator/is-straight-flush');
const isStraight = require('../lib/evaluator/is-straight');
const isThreeOfAKind = require('../lib/evaluator/is-three-of-a-kind');
const isTwoPair = require('../lib/evaluator/is-two-pair');

describe('evaluator', function () {

    it('should enumerate all possible hands and find the right number of each type of hand', function () {

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
                            counts[evaluator(cards).hand]++;
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

    describe('classifiers', function () {

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

        describe('is-straight-flush', function () {
            it('should return true when hand is a straight flush', function () {
                data.STRAIGHTFLUSH.forEach((testcase) => {
                    expect(isStraightFlush(testcase.cards)).to.eql(testcase.result);
                });
            });
            it('should return false when hand is not a straight flush', function () {
                Object.keys(data).filter((key) => key !== 'STRAIGHTFLUSH').forEach((key) => {
                    data[key].forEach((testcase) => {
                        expect(isStraightFlush(testcase.cards)).to.be(false);
                    });
                });
            });
        });

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

        describe('is-two-pair', function () {
            it('should return true when hand is two pair', function () {
                data.TWOPAIR.forEach((testcase) => {
                    expect(isTwoPair(testcase.cards)).to.eql(testcase.result);
                });
            });
            it('should return false when hand is not two pair', function () {
                Object.keys(data).filter((key) => key !== 'TWOPAIR').forEach((key) => {
                    data[key].forEach((testcase) => {
                        expect(isTwoPair(testcase.cards)).to.be(false);
                    });
                });
            });
        });

    });

    describe('helpers', function () {
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
    });
});

