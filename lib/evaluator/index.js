'use strict';

const evaluators = [
    require('./is-high-card'),
    require('./is-one-pair'),
    require('./is-two-pair'),
    require('./is-three-of-a-kind'),
    require('./is-straight'),
    require('./is-flush'),
    require('./is-full-house'),
    require('./is-four-of-a-kind'),
    require('./is-straight-flush'),
];

module.exports = function handEval(hand) {

    for (let i = 0; i < evaluators.length; i++) {
        let r = evaluators[i](hand);
        if (r) {
            return r;
        }
    }

    throw new Error('could not classify hand');
};
