'use strict';

const groupByRank = require('./group-by-rank');

module.exports = function isFourOfAKind(hand) {

    const grouped = groupByRank(hand);

    if (grouped.length === 2 && grouped[0][1].length === 4 && grouped[1][1].length === 1) {
        return {
            hand: 'FOUROFAKIND',
            ranks: grouped.map((grouping) => grouping[0]),
        };
    }

    return false;
};
