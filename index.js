'use strict';

/**
 * Module dependencies.
 */

var posjs,
    tagger;

posjs = require('pos');
tagger = new posjs.Tagger();

/**
 * Define `pos`.
 */

function pos() {}

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
 * Define `attach`.
 *
 * @param {Retext} retext - Instance of Retext.
 */

function attach(retext) {
    var WordNode;

    WordNode = retext.parser.TextOM.WordNode;

    WordNode.on('changetextinside', onchange);
    WordNode.on('removeinside', onchange);
    WordNode.on('insertinside', onchange);
    WordNode.on('remove', onchange);
    WordNode.on('remove', onremove);
    WordNode.on('insert', onchange);
}

/**
 * Expose `attach`.
 */

pos.attach = attach;

/**
 * Expose `pos`.
 */

module.exports = pos;
