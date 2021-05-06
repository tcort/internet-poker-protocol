'use strict';

const groupByRank = require('./group-by-rank');

module.exports = function isFullHouse(hand) {

    const grouped = groupByRank(hand);

    if (grouped.length === 2 && grouped[0][1].length === 3 && grouped[1][1].length === 2) {
        return {
            hand: 'FULLHOUSE',
            ranks: grouped.map((grouping) => grouping[0]),
        };
    }

    return false;
};
