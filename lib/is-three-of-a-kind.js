'use strict';

const groupByRank = require('./group-by-rank');

module.exports = function isThreeOfAKind(hand) {

    const grouped = groupByRank(hand);

    if (grouped.length === 3 && grouped[0][1].length === 3 && grouped[1][1].length === 1 && grouped[2][1].length === 1) {
        return {
            hand: 'THREEOFAKIND',
            ranks: grouped.map((grouping) => grouping[0]),
        };
    }

    return false;
};
