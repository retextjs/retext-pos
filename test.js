'use strict';

/* eslint-env mocha */

/*
 * Dependencies.
 */

var assert = require('assert');
var retext = require('retext');
var visit = require('unist-util-visit');
var pos = require('./');

/*
 * Fixtures.
 */

var sentence = 'I went to the store, to buy 5.2 gallons of milk.';

var tags = [
    'NN',
    'VBD',
    'TO',
    'DT',
    'NN',
    'TO',
    'VB',
    'CD',
    'NNS',
    'IN',
    'NN'
];

/*
 * Tests.
 */

describe('pos()', function () {
    retext().use(pos).process(sentence, function (err, file) {
        it('should work', function (done) {
            var index = -1;

            visit(file.namespace('retext').cst, 'WordNode', function (node) {
                assert.equal(node.data.partOfSpeech, tags[++index]);
            });

            done(err);
        });
    });
});
