var doc = require('global/document')
var win = require('global/window')
var createElement = require('virtual-dom/create-element')
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')
var h = require('virtual-dom/h')
var debounce = require('debounce')
var unified = require('unified')
var english = require('retext-english')
var pos = require('retext-pos')

var own = {}.hasOwnProperty

var darkQuery = '(prefers-color-scheme: dark)'

var map = {
  CC: 'Coord Conjunction',
  CD: 'Cardinal number',
  DT: 'Determiner',
  EX: 'Existential there',
  FW: 'Foreign Word',
  IN: 'Preposition',
  JJ: 'Adjective',
  JJR: 'Adjective, comparative',
  JJS: 'Adjective, superlative',
  LS: 'List item marker',
  MD: 'Modal',
  NN: 'Noun, singular or mass',
  NNP: 'Proper noun, singular',
  NNPS: 'Proper noun, plural',
  NNS: 'Noun, plural',
  POS: 'Possessive ending',
  PDT: 'Predeterminer',
  PP$: 'Possessive pronoun',
  PRP: 'Personal pronoun',
  RB: 'Adverb',
  RBR: 'Adverb, comparative',
  RBS: 'Adverb, superlative',
  RP: 'Particle',
  SYM: 'Symbol',
  TO: '"to"',
  UH: 'Interjection',
  VB: 'Verb, base form',
  VBD: 'Verb, past tense',
  VBG: 'Verb, gerund',
  VBN: 'Verb, past part',
  VBP: 'Verb, present',
  VBZ: 'Verb, present',
  WDT: 'Wh-determiner',
  WP: 'Wh pronoun',
  WP$: 'Possessive-Wh',
  WRB: 'Wh-adverb'
}

var color = colors(Object.keys(map).length)

var ceil = Math.ceil

var processor = unified()
  .use(english)
  .use(pos)

var main = doc.querySelector('main')

var state = {
  value: doc.querySelector('template').innerHTML
}

win.matchMedia(darkQuery).addListener(onmediachange)

var tree = render(state)
var dom = main.appendChild(createElement(tree))

function onchangevalue(ev) {
  var prev = state.value
  var next = ev.target.value

  if (prev !== next) {
    state.value = next
    onchange()
  }
}

function onchange() {
  var next = render(state)
  dom = patch(dom, diff(tree, next))
  tree = next
}

function render(state) {
  var tree = processor.runSync(processor.parse(state.value))
  var change = debounce(onchangevalue, 4)
  var key = 0

  var keys = Object.keys(map).reduce(function(all, cur) {
    return all.concat(
      h(
        'span',
        {key: 'c-' + key, style: {backgroundColor: color(cur)}},
        map[cur]
      ),
      ' '
    )
  }, [])

  setTimeout(resize, 4)

  return h('div', [
    h('section.highlight', [h('h1', {key: 'title'}, 'POS: Part of Speech')]),
    h('div', {key: 'editor', className: 'editor'}, [
      h('div', {key: 'draw', className: 'draw'}, pad(all(tree, []))),
      h('textarea', {
        key: 'area',
        value: state.value,
        oninput: change,
        onpaste: change,
        onkeyup: change,
        onmouseup: change
      })
    ]),
    h('section.highlight', [h('p', {key: 'map'}, keys)]),
    h('section.credits', {key: 'credits'}, [
      h('p', [
        h('a', {href: 'https://github.com/retextjs/retext-pos'}, 'Project'),
        ' • ',
        h(
          'a',
          {href: 'https://github.com/retextjs/retext-pos/tree/src'},
          'Fork this website'
        ),
        ' • ',
        h(
          'a',
          {href: 'https://github.com/retextjs/retext-pos/blob/src/license'},
          'MIT'
        ),
        ' • ',
        h('a', {href: 'https://wooorm.com'}, '@wooorm')
      ])
    ])
  ])

  function all(node, parentIds) {
    var children = node.children
    var length = children.length
    var index = -1
    var results = []

    while (++index < length) {
      results = results.concat(one(children[index], parentIds.concat(index)))
    }

    return results
  }

  function one(node, parentIds) {
    var result = 'value' in node ? node.value : all(node, parentIds)
    var id = parentIds.join('-') + '-' + key
    var tag = node.data && node.data.partOfSpeech

    if (tag && own.call(map, tag)) {
      result = h(
        'span',
        {key: id, id: id, style: {backgroundColor: color(tag)}},
        result
      )
      key++
    }

    return result
  }

  // Trailing white-space in a `textarea` is shown, but not in a `div` with
  // `white-space: pre-wrap`.
  // Add a `br` to make the last line feed explicit.
  function pad(nodes) {
    var tail = nodes[nodes.length - 1]

    if (typeof tail === 'string' && tail.charAt(tail.length - 1) === '\n') {
      nodes.push(h('br', {key: 'break'}))
    }

    return nodes
  }
}

function rows(node) {
  if (node) {
    return (
      ceil(
        node.getBoundingClientRect().height /
          parseInt(win.getComputedStyle(node).lineHeight, 10)
      ) + 1
    )
  }
}

function resize() {
  dom.querySelector('textarea').rows = rows(dom.querySelector('.draw'))
}

function colors(max) {
  var cached = {}
  var count = 0
  var step = 360 / max
  var dark = win.matchMedia(darkQuery).matches

  return color

  function color(id) {
    var lightness
    var value

    if (own.call(cached, id)) {
      return cached[id]
    }

    lightness = dark ? '12.5%' : '90%'
    value = 'hsl(' + count * step + ', 96%, ' + lightness + ')'
    cached[id] = value
    count++

    return value
  }
}

function onmediachange() {
  color = colors(Object.keys(map).length)
  onchange()
}
