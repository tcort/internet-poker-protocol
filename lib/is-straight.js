'use strict';

const isStraightFlush = require('./is-straight-flush');
const groupByRank = require('./group-by-rank');
const sortByRank = require('./sort-by-rank');
const ranks = require('deckofcards').Card.ranks;

module.exports = function isStraight(hand) {

    if (isStraightFlush(hand)) {
        return false; 
    }

    const grouped = groupByRank(hand);

    if (grouped.length === 5) {

        const sorted = sortByRank(hand);

        if (ranks.indexOf(sorted[0].rank) - ranks.indexOf(sorted[4].rank) === 4) {
            return {
                hand: 'STRAIGHT',
                rank: sorted[0].rank,
            };
        } else if (ranks.indexOf(sorted[1].rank) - ranks.indexOf(sorted[4].rank) === 3 && sorted[0].rank === 'A' && sorted[4].rank === '2') { // ace low straight
            return {
                hand: 'STRAIGHT',
                rank: sorted[1].rank,
            };
        }
    }

    return false;
};
