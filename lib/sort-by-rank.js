'use strict';

const _ = require('lodash');
const ranks = require('deckofcards').Card.ranks;

module.exports = function sortByRank(hand) {
    return _.clone(hand).sort((a, b) => ranks.indexOf(b.rank) - ranks.indexOf(a.rank));
};
