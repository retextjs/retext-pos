'use strict';

var visit = require('unist-util-visit');
var toString = require('nlcst-to-string');
var posjs = require('pos');

module.exports = pos;

var tagger = new posjs.Tagger();

function pos() {
  return transformer;
}

function transformer(tree) {
  var queue = [];

  visit(tree, 'WordNode', visitor);

  /* Gather a parent if not already gathered. */
  function visitor(node, index, parent) {
    if (parent && queue.indexOf(parent) === -1) {
      queue.push(parent);
      one(parent);
    }
  }

  /* Patch all words in `parent`. */
  function one(node) {
    var children = node.children;
    var length = children.length;
    var index = -1;
    var values = [];
    var words = [];
    var child;
    var tags;

    while (++index < length) {
      child = children[index];

      if (child.type === 'WordNode') {
        values.push(toString(child));
        words.push(child);
      }
    }

    tags = tagger.tag(values);
    index = -1;
    length = tags.length;

    while (++index < length) {
      patch(words[index], tags[index][1]);
    }
  }

  /* Patch a `partOfSpeech` property on `node`s. */
  function patch(node, tag) {
    var data = node.data || (node.data = {});
    data.partOfSpeech = tag;
  }
}
