'use strict';

exports = module.exports = function () {};

var pos, tagger;

pos = require('pos');
tagger = new pos.Tagger();

function onchange() {
    var value = this.toString();

    this.data.partOfSpeech = value ? tagger.tag([value])[0][1] : null;
}

function attach(retext) {
    retext.parser.TextOM.WordNode.on('changetextinside', onchange);
    retext.parser.TextOM.WordNode.on('removeinside', onchange);
    retext.parser.TextOM.WordNode.on('insertinside', onchange);
}

exports.attach = attach;
