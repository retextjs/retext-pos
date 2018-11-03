'use strict';

var test = require('tape');
var retext = require('retext');
var visit = require('unist-util-visit');
var pos = require('.');

var sentence = 'I went to the store, to buy 5.2 gallons of milk.';

var tags = [
  'PRP',
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

test('pos()', function (t) {
  var proc = retext().use(pos);
  var tree = proc.run(proc.parse(sentence));
  var index = -1;

  visit(tree, 'WordNode', function (node) {
    t.equal(node.data.partOfSpeech, tags[++index]);
  });

  t.end();
});
