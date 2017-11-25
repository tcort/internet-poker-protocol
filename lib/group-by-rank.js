'use strict';

const _ = require('lodash');
const ranks = require('deckofcards').Card.ranks;

module.exports = function groupByRank(hand) {
    return _.toPairs(_.groupBy(hand, (c) => c.rank)).sort((a, b) => {
        if (a[1].length === b[1].length) {
            return ranks.indexOf(b[0]) - ranks.indexOf(a[0]);
        }
        return b[1].length - a[1].length;
    });
};
