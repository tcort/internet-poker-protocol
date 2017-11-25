'use strict';

const _ = require('lodash');
const sortByRank = require('./sort-by-rank');
const ranks = require('deckofcards').Card.ranks;

module.exports = function isStraightFlush(hand) {

    const sorted = sortByRank(hand);

    if (_.keys(_.groupBy(hand, (c) => c.suit)).length !== 1) { // flush?
        return false;
    }

    if (ranks.indexOf(sorted[0].rank) - ranks.indexOf(sorted[4].rank) === 4) {
        return {
            hand: 'STRAIGHTFLUSH',
            rank: sorted[0].rank,
        };
    } else if (ranks.indexOf(sorted[1].rank) - ranks.indexOf(sorted[4].rank) === 3 && sorted[0].rank === 'A' && sorted[4].rank === '2') { // ace low straight
        return {
            hand: 'STRAIGHTFLUSH',
            rank: sorted[1].rank,
        };
    }

    return false;
};
