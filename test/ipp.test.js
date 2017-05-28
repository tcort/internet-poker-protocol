'use strict';

const IPP = require('../');
const expect = require('expect.js');

describe('IPP', function () {
    describe('Message', function () {
        const messages = [
            { s: 'IPP 2.0 Testing 1-2-3',                   o: { command: 'IPP', version: '2.0', info: 'Testing 1-2-3' } },
            { s: 'IPP 2.0.0 send BUYIN to join the game',   o: { command: 'IPP', version: '2.0.0', info: 'send BUYIN to join the game' } },
            { s: 'BUYIN Alpha 1000',                        o: { command: 'BUYIN', name: 'Alpha', amt: 1000 } },
            { s: 'WELCOME Beta',                            o: { command: 'WELCOME', name: 'Beta' } },
            { s: 'NEWGAME HOLDEM 10 20 3',                  o: { command: 'NEWGAME', type: 'HOLDEM', low: 10, high: 20, raises: 3 } },
            { s: 'NEWGAME DRAW 10 20 3',                    o: { command: 'NEWGAME', type: 'DRAW', low: 10, high: 20, raises: 3 } },
            { s: 'NEWGAME STUD 5 10 20 3',                  o: { command: 'NEWGAME', type: 'STUD', cards: 5, low: 10, high: 20, raises: 3 } },
            { s: 'NEWGAME STUD 7 10 20 3',                  o: { command: 'NEWGAME', type: 'STUD', cards: 7, low: 10, high: 20, raises: 3 } },
            { s: 'PLAYER Fred 1000',                        o: { command: 'PLAYER', name: 'Fred', amt: 1000 } },
            { s: 'BUTTON Fred',                             o: { command: 'BUTTON', name: 'Fred' } },
            { s: 'ANTE 5',                                  o: { command: 'ANTE', amt: 5 } },
            { s: 'DEAL AS 7H',                              o: { command: 'DEAL', cards: [ 'AS', '7H' ] } },
            { s: 'FROM Gamma OPEN 20',                      o: { command: 'FROM', name: 'Gamma', msg: { command: 'OPEN', amt: 20 } } },
            { s: 'FROM Gamma DRAW 2',                       o: { command: 'FROM', name: 'Gamma', msg: { command: 'DRAW', num: 2 } } },
            { s: 'FLOP 8C TS QS',                           o: { command: 'FLOP', cards: [ '8C', 'TS', 'QS' ] } },
            { s: 'TURN 2D',                                 o: { command: 'TURN', card: '2D' } },
            { s: 'RIVER KD',                                o: { command: 'RIVER', card: 'KD' } },
            { s: 'DRAW?',                                   o: { command: 'DRAW?' } },
            { s: 'FOLD',                                    o: { command: 'FOLD' } },
            { s: 'DRAW 2 AS KC',                            o: { command: 'DRAW', num: 2, cards: [ 'AS', 'KC' ] } },
            { s: 'DRAWN 2 AS KC',                           o: { command: 'DRAWN', num: 2, cards: [ 'AS', 'KC' ] } },
            { s: 'UP AC',                                   o: { command: 'UP', card: 'AC' } },
            { s: 'DOWN AC',                                 o: { command: 'DOWN', card: 'AC' } },
            { s: 'ACTION? BLIND 5',                         o: { command: 'ACTION?', action: 'BLIND', amt: 5 } },
            { s: 'ACTION? BLIND 10',                        o: { command: 'ACTION?', action: 'BLIND', amt: 10 } },
            { s: 'ACTION? STRADDLE 4',                      o: { command: 'ACTION?', action: 'STRADDLE', amt: 4 } },
            { s: 'ACTION? OWING 0',                         o: { command: 'ACTION?', action: 'OWING', amt: 0 } },
            { s: 'BLIND 5',                                 o: { command: 'BLIND', amt: 5 } },
            { s: 'TAPOUT 5',                                o: { command: 'TAPOUT', amt: 5 } },
            { s: 'STRADDLE 4',                              o: { command: 'STRADDLE', amt: 4 } },
            { s: 'CALL 5',                                  o: { command: 'CALL', amt: 5 } },
            { s: 'RAISE 5',                                 o: { command: 'RAISE', amt: 5 } },
            { s: 'OPEN 5',                                  o: { command: 'OPEN', amt: 5 } },
            { s: 'CHECK',                                   o: { command: 'CHECK' } },
            { s: 'SHOW?',                                   o: { command: 'SHOW?' } },
            { s: 'SHOW STRAIGHTFLUSH J',                    o: { command: 'SHOW', hand: 'STRAIGHTFLUSH', rank: 'J' } },
            { s: 'SHOW FOUROFAKIND 7 A',                    o: { command: 'SHOW', hand: 'FOUROFAKIND', ranks: [ '7', 'A' ] } },
            { s: 'SHOW FULLHOUSE Q 3',                      o: { command: 'SHOW', hand: 'FULLHOUSE', ranks: [ 'Q', '3' ] } },
            { s: 'SHOW FLUSH T 9 8 6 2',                    o: { command: 'SHOW', hand: 'FLUSH', ranks: [ 'T', '9', '8', '6', '2' ] } },
            { s: 'SHOW STRAIGHT K',                         o: { command: 'SHOW', hand: 'STRAIGHT', rank: 'K' } },
            { s: 'SHOW THREEOFAKIND 2 Q 7',                 o: { command: 'SHOW', hand: 'THREEOFAKIND', ranks: [ '2', 'Q', '7' ] } },
            { s: 'SHOW TWOPAIR J 8 A',                      o: { command: 'SHOW', hand: 'TWOPAIR', ranks: [ 'J', '8', 'A' ] } },
            { s: 'SHOW ONEPAIR T A 5 3',                    o: { command: 'SHOW', hand: 'ONEPAIR', ranks: [ 'T', 'A', '5', '3' ] } },
            { s: 'SHOW HIGHCARD Q T 8 7 2',                 o: { command: 'SHOW', hand: 'HIGHCARD', ranks: [ 'Q', 'T', '8', '7', '2' ] } },
            { s: 'BEAT? ONEPAIR 2 Q 8 7',                   o: { command: 'BEAT?', hand: 'ONEPAIR', ranks: [ '2', 'Q', '8', '7' ] } },
            { s: 'NO',                                      o: { command: 'NO' } },
            { s: 'YES STRAIGHT K',                          o: { command: 'YES', hand: 'STRAIGHT', rank: 'K' } },
            { s: 'WINNER Gamma 170 ONEPAIR 2 Q 8 7',        o: { command: 'WINNER', name: 'Gamma', amt: 170, hand: 'ONEPAIR', ranks: [ '2', 'Q', '8', '7' ] } },
            { s: 'BUSTED Alpha',                            o: { command: 'BUSTED', name: 'Alpha' } },
            { s: 'GAMEOVER Alpha 20',                       o: { command: 'GAMEOVER', name: 'Alpha', amt: 20 } },
            { s: 'ERROR Too many bogus messages -- goodbye',o: { command: 'ERROR', info: 'Too many bogus messages -- goodbye' } },
            { s: 'QUIT Alpha',                              o: { command: 'QUIT', name: 'Alpha' } },
        ];
        it('.parse(s)', function () {
            messages.forEach((m) => {
                expect(IPP.Message.parse(m.s)).to.eql(m.o);
            });
        });
        it('.stringify(o)', function () {
            messages.forEach((m) => {
                expect(IPP.Message.stringify(m.o)).to.eql(m.s);
            });
        });
    });
});
