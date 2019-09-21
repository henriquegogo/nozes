((init, describe, test, assert, before, done) => {
  init();

  const Nozes = require('./nozes.js').Nozes;
  let createElement, watch, dispatch, connect, router;

  describe('Create element', it => {
    before(each => {
      [ createElement, watch, dispatch, connect, router ] = Object.values(Nozes());
    });

    test('has a generic varructor for any HTML tag', it => {
      const divElement = createElement('div');

      return assert(divElement);
    });

    test('has a varructor for each HTML tag', it => {
      const divElement = createElement.div();
      const spanElement = createElement.span();

      return assert(divElement && spanElement);
    });

    test('the return of any varructor is an HTMLElement', it => {
      const divElement = createElement('div');
      const spanElement = createElement.span();

      return assert(divElement.tagName === 'DIV' && spanElement.tagName === 'SPAN');
    });

    test('if a parameter is an object, their attributes will be assigned to that element', it => {
      const divElement = createElement.div({ title: 'Title' });

      return assert(divElement.title === 'Title');
    });

    test('if a parameter is another HTML element, this will be appended as child of that', it => {
      const spanElement = createElement.span();
      const divElement = createElement.div(spanElement);

      return assert(divElement.children[0] === spanElement);
    });

    test('if a parameter is a string or a number, a TextNode will be created with the value and appended as child of the element', it => {
      const divElement = createElement.div('Body');
      const spanElement = createElement.span(1);

      return assert(divElement.innerHTML === 'Body', spanElement.innerHTML === 1);
    });

    test('if a parameter is a a function, it\'ll be called with the element as first parameter', it => {
      let ref;
      const divElement = createElement.div(function(me) { ref = me });

      return assert(divElement === ref);
    });
  });

  describe('Watch and Dispatch', it => {
    test('watch function create an event listener that call a function if dispatched', it => {
      let expected = 'old value';

      watch('test', value => expected = value);
      dispatch('test', 'new value');

      return assert(expected === 'new value');
    });

    test('everytime the watch function is invoked, a listener is created', it => {
      let old1 = 'old value 1';
      let old2 = 'old value 2';
      let old3 = 'old value 3';

      watch('test', value => old1 = value);
      watch('test', value => old2 = value);
      watch('diff', value => old3 = value);
      dispatch('test', 'new value');

      return assert(old1 === 'new value' && old2 === 'new value' && old3 === 'old value 3');
    });

    test('watch an event that already belongs to a group will replace him', it => {
      let old1 = 'old value 1';
      let old2 = 'old value 2';

      watch('test', value => old1 = value, 'group');
      watch('test', value => old2 = value, 'group');
      dispatch('test', 'new value');

      return assert(old1 === 'old value 1' && old2 === 'new value');
    });

    test('blank string event will be dispatched everytime', it => {
      let messages = [];

      watch('', msg => messages.push(msg));
      dispatch('test 1', 'some message');
      dispatch('test 2', 'another message');
      dispatch('test 3', 'last message');

      return assert(messages.length === 3);
    });
  });

  done();
})(function init() {
  globalThis.results = [];
  globalThis.window = {};
  globalThis.document = {
    createElement: function(tag) {
      return {
        constructor: function HTMLElement() {},
        tagName: tag.toUpperCase(),
        children: [],
        innerHTML: '',
        appendChild: function(child) {
          if (typeof child === 'string') this.innerHTML = child;
          else this.children.push(child);
        }
      }
    },
    createTextNode: function(text) {
      return text;
    }
  }
},
function describe(text, func) { console.group('\n\x1b[37m', text); func(); console.groupEnd() },
function test(text, func) { console.log(func(), '\x1b[90m', text) },
function assert(sentence) { return results.push(sentence) && sentence ? '\x1b[32m✓' : '\x1b[31m✗' },
function before(func) { func() },
function done() { console.info('\n\x1b[32mTOTAL PASS:', results.filter(i=>i).length, '\n\x1b[31mTOTAL FAIL:', results.filter(i=>!i).length) });
