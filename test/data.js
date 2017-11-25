'use strict';

const Card = require('deckofcards').Card;

const strToCards = (str) => str.split(' ').map((card) => new Card(card));

module.exports = {
    STRAIGHTFLUSH: [
        { cards: strToCards('QH KH AH JH TH'), result: { hand: 'STRAIGHTFLUSH', rank: 'A' } },
        { cards: strToCards('3C 2C AC 5C 4C'), result: { hand: 'STRAIGHTFLUSH', rank: '5' } },
        { cards: strToCards('TD 8D 9D JD QD'), result: { hand: 'STRAIGHTFLUSH', rank: 'Q' } },
        { cards: strToCards('4S 6S 5S 3S 7S'), result: { hand: 'STRAIGHTFLUSH', rank: '7' } },
        { cards: strToCards('AS KS QS JS TS'), result: { hand: 'STRAIGHTFLUSH', rank: 'A' } },
    ],
    FOUROFAKIND: [
        { cards: strToCards('AH KH KC KS KD'), result: { hand: 'FOUROFAKIND', ranks: [ 'K', 'A' ] } },
        { cards: strToCards('2D 2H 2C 2S AD'), result: { hand: 'FOUROFAKIND', ranks: [ '2', 'A' ] } },
        { cards: strToCards('AH KH AC AS AD'), result: { hand: 'FOUROFAKIND', ranks: [ 'A', 'K' ] } },
        { cards: strToCards('JD JH JC JS TD'), result: { hand: 'FOUROFAKIND', ranks: [ 'J', 'T' ] } },
        { cards: strToCards('KH KS JS KD KC'), result: { hand: 'FOUROFAKIND', ranks: [ 'K', 'J' ] } },
    ],
    FULLHOUSE: [
        { cards: strToCards('AH AS KD KC KS'), result: { hand: 'FULLHOUSE', ranks: [ 'K', 'A' ] } },
        { cards: strToCards('AH AS KD AC KS'), result: { hand: 'FULLHOUSE', ranks: [ 'A', 'K' ] } },
        { cards: strToCards('2H 2S KD 2C KS'), result: { hand: 'FULLHOUSE', ranks: [ '2', 'K' ] } },
        { cards: strToCards('AS KS AD KD KC'), result: { hand: 'FULLHOUSE', ranks: [ 'K', 'A' ] } },
    ],
    FLUSH: [
        { cards: strToCards('AH 4H TH 3H 6H'), result: { hand: 'FLUSH', ranks: [ 'A', 'T', '6', '4', '3' ] } },
        { cards: strToCards('AD 4D TD 3D 6D'), result: { hand: 'FLUSH', ranks: [ 'A', 'T', '6', '4', '3' ] } },
        { cards: strToCards('AS 4S TS 3S 6S'), result: { hand: 'FLUSH', ranks: [ 'A', 'T', '6', '4', '3' ] } },
        { cards: strToCards('AC 4C TC 3C 6C'), result: { hand: 'FLUSH', ranks: [ 'A', 'T', '6', '4', '3' ] } },
        { cards: strToCards('AS KS QS JS 7S'), result: { hand: 'FLUSH', ranks: [ 'A', 'K', 'Q', 'J', '7' ] } },
    ],
    STRAIGHT: [
        { cards: strToCards('AH KD QS TC JD'), result: { hand: 'STRAIGHT', rank: 'A' } },
        { cards: strToCards('3C 2C AC 5C 4D'), result: { hand: 'STRAIGHT', rank: '5' } },
        { cards: strToCards('TD 8H 9D JD QD'), result: { hand: 'STRAIGHT', rank: 'Q' } },
        { cards: strToCards('4S 6S 5C 3S 7S'), result: { hand: 'STRAIGHT', rank: '7' } },
        { cards: strToCards('AS KD QS JS TS'), result: { hand: 'STRAIGHT', rank: 'A' } },
    ],
    THREEOFAKIND: [
        { cards: strToCards('AH KH JC KS KD'), result: { hand: 'THREEOFAKIND', ranks: [ 'K', 'A', 'J' ] } },
        { cards: strToCards('2D 2H 2C 3S AD'), result: { hand: 'THREEOFAKIND', ranks: [ '2', 'A', '3' ] } },
        { cards: strToCards('AH KH AC QS AD'), result: { hand: 'THREEOFAKIND', ranks: [ 'A', 'K', 'Q' ] } },
        { cards: strToCards('JD JH JC 9S TD'), result: { hand: 'THREEOFAKIND', ranks: [ 'J', 'T', '9' ] } },
        { cards: strToCards('AS KS JS KD KC'), result: { hand: 'THREEOFAKIND', ranks: [ 'K', 'A', 'J' ] } },
    ],
    TWOPAIR: [
        { cards: strToCards('AH KH AC KS JD'), result: { hand: 'TWOPAIR', ranks: [ 'A', 'K', 'J' ] } },
        { cards: strToCards('2D 2H AC 3S AD'), result: { hand: 'TWOPAIR', ranks: [ 'A', '2', '3' ] } },
        { cards: strToCards('KH AH KC AS QD'), result: { hand: 'TWOPAIR', ranks: [ 'A', 'K', 'Q' ] } },
        { cards: strToCards('JD JH TC 9S TD'), result: { hand: 'TWOPAIR', ranks: [ 'J', 'T', '9' ] } },
        { cards: strToCards('AS KS AD KD 7S'), result: { hand: 'TWOPAIR', ranks: [ 'A', 'K', '7' ] } },
    ],
    ONEPAIR: [
        { cards: strToCards('AH 2H AC KS JD'), result: { hand: 'ONEPAIR', ranks: [ 'A', 'K', 'J', '2' ] } },
        { cards: strToCards('2D 2H AC 3S TD'), result: { hand: 'ONEPAIR', ranks: [ '2', 'A', 'T', '3' ] } },
        { cards: strToCards('AS KD KS JS 7S'), result: { hand: 'ONEPAIR', ranks: [ 'K', 'A', 'J', '7' ] } },
    ],
    HIGHCARD: [
        { cards: strToCards('5D 2H 9C 3S KD'), result: { hand: 'HIGHCARD', ranks: [ 'K', '9', '5', '3', '2' ] } },
        { cards: strToCards('AS KD JS 7S 6S'), result: { hand: 'HIGHCARD', ranks: [ 'A', 'K', 'J', '7', '6' ] } },
    ],
};
