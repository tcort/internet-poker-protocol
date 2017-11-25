'use strict';

const groupByRank = require('./group-by-rank');

module.exports = function isOnePair(hand) {

    const grouped = groupByRank(hand);

    if (grouped.length === 4 && grouped[0][1].length === 2 && grouped[1][1].length === 1 && grouped[2][1].length === 1 && grouped[3][1].length === 1) {
        return {
            hand: 'ONEPAIR',
            ranks: grouped.map((grouping) => grouping[0]),
        };
    }

    return false;
};
