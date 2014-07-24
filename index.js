'use strict';

exports = module.exports = function () {};

var pos, tagger;

pos = require('pos');
tagger = new pos.Tagger();

function onchangeinparent(parent) {
    var values = [],
        wordNodes = [],
        iterator, length, taggedValues, node, value;

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

    iterator = -1;
    length = taggedValues.length;

    while (++iterator < length) {
        wordNodes[iterator].data.partOfSpeech = taggedValues[iterator][1];
    }
}

function onchange() {
    var self = this,
        value;

    if (self.parent) {
        onchangeinparent(self.parent);

        return;
    }

    value = self.toString();

    self.data.partOfSpeech = value ? tagger.tag([value])[0][1] : null;
}

function attach(retext) {
    var TextOM = retext.parser.TextOM;

    TextOM.WordNode.on('changetextinside', onchange);
    TextOM.WordNode.on('removeinside', onchange);
    TextOM.WordNode.on('insertinside', onchange);
}

exports.attach = attach;
