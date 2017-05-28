'use strict';

const PEG = require('pegjs');
const fs = require('fs');
const path = require('path');
const util = require('util');

const parser = PEG.buildParser(fs.readFileSync(path.join(__dirname, 'ipp.peg'), 'utf8'));

class IPP {
    static parse(s) {
        return parser.parse(s);
    }
    static stringify(o) {
        const handToString = (o) => {
            switch (o.hand) {
                case 'STRAIGHTFLUSH': return `${o.hand} ${o.rank}`;
                case 'FOUROFAKIND': return `${o.hand} ${o.ranks.join(' ')}`;
                case 'FULLHOUSE': return `${o.hand} ${o.ranks.join(' ')}`;
                case 'FLUSH': return `${o.hand} ${o.ranks.join(' ')}`;
                case 'STRAIGHT': return `${o.hand} ${o.rank}`;
                case 'THREEOFAKIND': return `${o.hand} ${o.ranks.join(' ')}`;
                case 'TWOPAIR': return `${o.hand} ${o.ranks.join(' ')}`;
                case 'ONEPAIR': return `${o.hand} ${o.ranks.join(' ')}`;
                case 'HIGHCARD': return `${o.hand} ${o.ranks.join(' ')}`;
                default: throw new Error('Unknown hand type ' + JSON.stringify(o));
            }
        };

        switch (o.command) {
            case 'IPP': return `${o.command} ${o.version} ${o.info}`;
            case 'BUYIN': return `${o.command} ${o.name} ${o.amt}`;
            case 'WELCOME': return `${o.command} ${o.name}`;
            case 'NEWGAME':
                switch (o.type) {
                    case 'HOLDEM': return `${o.command} ${o.type} ${o.low} ${o.high} ${o.raises}`;
                    case 'DRAW': return `${o.command} ${o.type} ${o.low} ${o.high} ${o.raises}`;
                    case 'STUD': return `${o.command} ${o.type} ${o.cards} ${o.low} ${o.high} ${o.raises}`;
                    default: throw new Error('Unknown game type');
                }
                break;
            case 'PLAYER': return `${o.command} ${o.name} ${o.amt}`;
            case 'BUTTON': return `${o.command} ${o.name}`;
            case 'ANTE': return `${o.command} ${o.amt}`;
            case 'DEAL': return `${o.command} ${o.cards.join(' ')}`;
            case 'FROM': return `${o.command} ${o.name} ${IPP.stringify(o.msg)}`;
            case 'FLOP': return `${o.command} ${o.cards.join(' ')}`;
            case 'TURN': return `${o.command} ${o.card}`;
            case 'RIVER': return `${o.command} ${o.card}`;
            case 'DRAW?': return `${o.command}`;
            case 'FOLD': return `${o.command}`;
            case 'DRAW': return (o.cards) ? `${o.command} ${o.num} ${o.cards.join(' ')}` : `${o.command} ${o.num}`;
            case 'DRAWN': return `${o.command} ${o.num} ${o.cards.join(' ')}`;
            case 'UP': return `${o.command} ${o.card}`;
            case 'DOWN': return `${o.command} ${o.card}`;
            case 'ACTION?': return `${o.command} ${o.action} ${o.amt}`;
            case 'BLIND': return `${o.command} ${o.amt}`;
            case 'TAPOUT': return `${o.command} ${o.amt}`;
            case 'STRADDLE': return `${o.command} ${o.amt}`;
            case 'CALL': return `${o.command} ${o.amt}`;
            case 'RAISE': return `${o.command} ${o.amt}`;
            case 'OPEN': return `${o.command} ${o.amt}`;
            case 'CHECK': return `${o.command}`;
            case 'SHOW?': return `${o.command}`;
            case 'SHOW': return `${o.command} ${handToString(o)}`;
            case 'BEAT?': return `${o.command} ${handToString(o)}`;
            case 'NO': return `${o.command}`;
            case 'YES': return `${o.command} ${handToString(o)}`;
            case 'WINNER': return `${o.command} ${o.name} ${o.amt} ${handToString(o)}`;
            case 'BUSTED': return `${o.command} ${o.name}`;
            case 'GAMEOVER': return `${o.command} ${o.name} ${o.amt}`;
            case 'OK': return `${o.command} ${IPP.stringify(o.msg)}`;
            case 'ERROR': return `${o.command} ${o.info}`;
            case 'QUIT': return `${o.command} ${o.name}`;
            default: throw new Error('Unknown command ' + JSON.stringify(o));
        }
    }
}

module.exports = IPP;
