/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module retext:pos
 * @fileoverview Retext part-of-speech (POS) tagger.
 */

'use strict';

/*
 * Dependencies.
 */

var visit = require('unist-util-visit');
var nlcstToString = require('nlcst-to-string');
var posjs;

/*
 * Duo and component / npm and component.
 */

try {
    posjs = require('pos');
} catch (err) {
    /* istanbul ignore next - browser */
    posjs = require('pos-js');
}

/*
 * Constants.
 */

var tagger = new posjs.Tagger();

/**
 * Patch a `partOfSpeech` property on `node`s.
 *
 * @param {NLCSTNode} node - Node.
 * @param {string} tag - Part-of-speech tag as returned
 *   by pos-js.
 */
function patch(node, tag) {
    var data = node.data || {};

    data.partOfSpeech = tag;

    node.data = data;
}

/**
 * Factory to gather parents and patch them based on their
 * childrens directionality.
 *
 * @return {function(node, index, parent)} - Can be passed
 *   to `visit`.
 */
function concatenateFactory() {
    var queue = [];

    /**
     * Gather a parent if not already gathered.
     *
     * @param {NLCSTWordNode} node - Word.
     * @param {number} index - Position of `node` in
     *   `parent`.
     * @param {NLCSTParentNode} parent - Parent of `child`.
     */
    function concatenate(node, index, parent) {
        if (parent && queue.indexOf(parent) === -1) {
            queue.push(parent);
        }
    }

    /**
     * Patch all words in `parent`.
     *
     * @param {NLCSTParentNode} node - Parent
     */
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
                values.push(nlcstToString(child));
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

    /**
     * Patch all parents.
     */
    function done() {
        var length = queue.length;
        var index = -1;

        while (++index < length) {
            one(queue[index]);
        }
    }

    concatenate.done = done;

    return concatenate;
}

/**
 * Patch `stem` on each node.
 *
 * @param {NLCSTNode} cst - Syntax tree.
 */
function transformer(cst) {
    var concatenate = concatenateFactory();

    visit(cst, 'WordNode', concatenate);

    concatenate.done();
}

/**
 * Define `metaphone`.
 *
 * @return {Function} - `transformer`.
 */
function attacher() {
    return transformer;
}

/*
 * Expose `metaphone`.
 */

module.exports = attacher;
