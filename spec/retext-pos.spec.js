'use strict';

var pos, visit, Retext, assert, tree, tags, otherWords, otherTags;

pos = require('..');
Retext = require('retext');
visit = require('retext-visit');
assert = require('assert');

tree = new Retext()
    .use(visit)
    .use(pos)
    .parse('A simple, English, sentence');

tags = ['DT', 'JJ', 'NNP', 'NN'];
otherWords = ['Another', 'harder', 'longer', 'paragraph'];
otherTags = ['DT', 'JJR', 'RB', 'NN'];

describe('pos()', function () {
    it('should be of type `function`', function () {
        assert(typeof pos === 'function');
    });

    it('should process each `WordNode`', function () {
        var iterator = -1;

        tree.visitType(tree.WORD_NODE, function (wordNode) {
            assert(wordNode.data.partOfSpeech === tags[++iterator]);
        });
    });

    it('should set each partOfSpeech attribute to `null` when a WordNode ' +
        '(no longer?) has a value', function () {
            tree.visitType(tree.WORD_NODE, function (wordNode) {
                wordNode[0].fromString();
                assert(wordNode.data.partOfSpeech === null);
            });
        }
    );

    it('should automatically reprocess `WordNode`s when their values change',
        function () {
            var iterator = -1;

            tree.visitType(tree.WORD_NODE, function (wordNode) {
                wordNode[0].fromString(otherWords[++iterator]);
                assert(wordNode.data.partOfSpeech === otherTags[iterator]);
            });
        }
    );

    it('should set each partOfSpeech attribute to `null` when no longer ' +
        'attached, and without value', function () {
            tree.visitType(tree.WORD_NODE, function (wordNode) {
                wordNode.remove();
                assert(wordNode.data.partOfSpeech !== null);

                while (wordNode.head) {
                    wordNode.head.remove();
                }

                assert(wordNode.data.partOfSpeech === null);
            });
        }
    );
});
