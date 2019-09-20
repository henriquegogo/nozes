((init, describe, test, assert, done) => {
  init();

  const { createElement, watch, dispatch, connect, router } = require('./nozes.js').Nozes();

  describe('Create Element', it => {
    test('has a generic constructor for any HTML tag', it => {
      const divElement = createElement('div');

      return assert(divElement);
    });

    test('has a constructor for each HTML tag', it => {
      const { div, span } = createElement;
      const divElement = div();
      const spanElement = span();

      return assert(divElement && spanElement);
    });

    test('the return of any constructor is an HTMLElement', it => {
      const divElement = createElement('div');
      const spanElement = createElement.span();

      return assert(divElement.tagName === 'DIV' && spanElement.tagName === 'SPAN');
    });

    test('if a parameter is an object, their attributes will be assigned to that element', it => {
      const { div } = createElement;
      const divElement = div({ title: 'Title' });

      return assert(divElement.title === 'Title');
    });

    test('if a parameter is another HTML element, this will be appended as child of that', it => {
      const { div, span } = createElement;
      const spanElement = span();
      const divElement = div(spanElement);

      return assert(divElement.children[0] === spanElement);
    });

    test('if a parameter is a string or a number, a TextNode will be created with the value and appended as child of the element', it => {
      const { div, span } = createElement;
      const divElement = div('Body');
      const spanElement = span(1);

      return assert(divElement.innerHTML === 'Body', spanElement.innerHTML === 1);
    });

    test('if a parameter is a a function, it\'ll be called with the element as first parameter', it => {
      const { div } = createElement;
      let ref;
      const divElement = div(function(me) { ref = me });

      return assert(divElement === ref);
    });
  });

  done();
})(
  function init() { global.results = [];
    global.window = {};
    global.document = {
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
  function describe(text, func) { console.group('\x1b[37m', text); func(); console.groupEnd() },
  function test(text, func) { console.log(func(), '\x1b[90m', text) },
  function assert(sentence) { return results.push(sentence) && sentence ? '\x1b[32m✓' : '\x1b[31m✗' },
  function done() { console.info('\n\x1b[32mTOTAL PASS:', results.filter(i=>i).length, '\n\x1b[31mTOTAL FAIL:', results.filter(i=>!i).length) }
);
