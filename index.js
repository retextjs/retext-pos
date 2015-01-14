'use strict';

/*
 * Module dependencies.
 */

var posjs,
    tagger;

/*
 * Duo or npm:
 */

try {
    posjs = require('dariusk/pos-js');
} catch (exception) {
    posjs = require('pos');
}

tagger = new posjs.Tagger();

/**
 * A POS change inside a parent.
 *
 * @param {Parent} parent
 */
function onchangeinparent(parent) {
    var values,
        wordNodes,
        index,
        taggedValues,
        node,
        value;

    values = [];
    wordNodes = [];

    node = parent.head;

    while (node) {
        if (node.type === node.WORD_NODE) {
            value = node.toString();

            if (value) {
                values.push(value);
                wordNodes.push(node);
            } else {
                node.data.partOfSpeech = null;
            }
        }

        node = node.next;
    }

    taggedValues = tagger.tag(values);

    index = taggedValues.length;

    while (index--) {
        wordNodes[index].data.partOfSpeech = taggedValues[index][1];
    }
}

/**
 * A handler for change inside a word.
 *
 * @this {WordNode}
 */
function onchange() {
    var self,
        value;

    self = this;

    if (self.parent) {
        onchangeinparent(self.parent);

        return;
    }

    value = self.toString();

    self.data.partOfSpeech = value ? tagger.tag([value])[0][1] : null;
}

/**
 * `remove` handler.
 *
 * @param {Parent} previousParent
 * @this {WordNode}
 */
function onremove(previousParent) {
    onchangeinparent(previousParent);
}

/**
 * Define `pos`.
 *
 * @param {Retext} retext - Instance of Retext.
 */
function pos(retext) {
    var WordNode;

    WordNode = retext.parser.TextOM.WordNode;

    WordNode.on('changeinside', onchange);
    WordNode.on('change', onchange);
    WordNode.on('remove', onremove);
}

/*
 * Expose `pos`.
 */

module.exports = pos;
