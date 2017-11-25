'use strict';

const _ = require('lodash');
const isFlush = require('./is-flush');
const isStraight = require('./is-straight');
const isStraightFlush = require('./is-straight-flush');
const groupByRank = require('./group-by-rank');

module.exports = function isHighCard(hand) {

    if (isFlush(hand) || isStraight(hand) || isStraightFlush(hand)) {
        return false;
    }

    const grouped = groupByRank(hand);

    if (grouped.length === 5) {
        return {
            hand: 'HIGHCARD',
            ranks: grouped.map((grouping) => grouping[0]),
        };
    }

    return false;
};
