'use strict';

const _ = require('lodash');
const isStraightFlush = require('./is-straight-flush');
const sortByRank = require('./sort-by-rank');

module.exports = function isFlush(hand) {

    if (isStraightFlush(hand)) {
        return false;
    }

    if (_.keys(_.groupBy(hand, (c) => c.suit)).length === 1) {
        return {
            hand: 'FLUSH',
            ranks: _.map(sortByRank(hand), 'rank'),
        };
    }

    return false;
};
