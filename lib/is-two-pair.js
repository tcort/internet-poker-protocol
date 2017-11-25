'use strict';

const groupByRank = require('./group-by-rank');

module.exports = function isTwoPair(hand) {

    const grouped = groupByRank(hand);

    if (grouped.length === 3 && grouped[0][1].length === 2 && grouped[1][1].length === 2 && grouped[2][1].length === 1) {
        return {
            hand: 'TWOPAIR',
            ranks: grouped.map((grouping) => grouping[0]),
        };
    }

    return false;
};
