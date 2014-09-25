'use strict';

var pos,
    visit,
    content,
    Retext,
    assert,
    retext,
    tags,
    otherWords,
    otherTags;

/**
 * Module dependencies.
 */

pos = require('..');
visit = require('retext-visit');
content = require('retext-content');
Retext = require('retext');
assert = require('assert');

/**
 * Retext.
 */

retext = new Retext()
    .use(visit)
    .use(content)
    .use(pos);

/**
 * Fixtures.
 */

tags = ['DT', 'JJ', 'NNP', 'NN'];
otherWords = ['Another', 'harder', 'longer', 'paragraph'];
otherTags = ['DT', 'JJR', 'RB', 'NN'];

/**
 * Tests.
 */

describe('pos()', function () {
    it('should be a `function`', function () {
        assert(typeof pos === 'function');
    });

    it('should export an `attach` method', function () {
        assert(typeof pos.attach === 'function');
    });

    retext.parse('A simple, English, sentence', function (err, tree) {
        it('should not throw', function (done) {
            done(err);
        });

        it('should tag `WordNode`', function () {
            var index = -1;

            tree.visitType(tree.WORD_NODE, function (wordNode) {
                assert(wordNode.data.partOfSpeech === tags[++index]);
            });
        });

        it('should set `partOfSpeech` to `null` when `WordNode` ' +
            '(no longer?) has a value', function () {
                tree.visitType(tree.WORD_NODE, function (wordNode) {
                    wordNode.removeContent();

                    assert(wordNode.data.partOfSpeech === null);
                });
            }
        );

        it('should re-tag `WordNode`s when their value changes', function () {
            var index = -1;

            tree.visitType(tree.WORD_NODE, function (wordNode) {
                wordNode.replaceContent(otherWords[++index]);

                assert(wordNode.data.partOfSpeech === otherTags[index]);
            });
        });

        it('should set `partOfSpeech` to `null` when not attached or ' +
            'without value', function () {
                tree.visitType(tree.WORD_NODE, function (wordNode) {
                    wordNode.remove();

                    assert(wordNode.data.partOfSpeech !== null);

                    wordNode.removeContent();

                    assert(wordNode.data.partOfSpeech === null);
                });
            }
        );
    });
});
