((init, describe, test, assert, done) => {
  const { document } = init();

  const Nozes = require('./nozes.js').Nozes;
  const { createElement, styleClass, watch, dispatch, connect, router } = new Nozes();

  describe('Create element', () => {
    test('has a generic constructor for any HTML tag', () => {
      const divElement = createElement('div');

      return assert(divElement);
    });

    test('has a constructor for each HTML tag', () => {
      const divElement = createElement.div();
      const spanElement = createElement.span();

      return assert(divElement && spanElement);
    });

    test('the return of any constructor is an HTMLElement', () => {
      const divElement = createElement('div');
      const brElement = createElement('br');
      const spanElement = createElement.span();

      return assert(divElement.tagName === 'DIV' && brElement.tagName === 'BR' && spanElement.tagName === 'SPAN');
    });

    test('if a parameter is an object, their attributes will be assigned to that element', () => {
      const divElement = createElement.div({ title: 'Title' });

      return assert(divElement.title === 'Title');
    });

    test('if a parameter is another HTML element, this will be appended as child of that', () => {
      const spanElement = createElement.span();
      const divElement = createElement.div(spanElement);

      return assert(divElement.children[0] === spanElement);
    });

    test('if a parameter is a string or a number, a TextNode will be created with the value and appended as child of the element', () => {
      const divElement = createElement.div('Body');
      const spanElement = createElement.span(1);

      return assert(divElement.innerHTML === 'Body', spanElement.innerHTML === 1);
    });

    test('if a parameter is a function, it\'ll be called with the element as first parameter', () => {
      let ref;
      const divElement = createElement.div(function(me) { ref = me });

      return assert(divElement === ref);
    });

    test('if a parameter is an array, each item will be evaluated like other parameters', () => {
      const spanElement = createElement.span();
      const divElement = createElement.div([spanElement, { title: 'Title' }]);

      return assert(divElement.title === 'Title' && divElement.children[0] === spanElement);
    });

    test('a style parameter can be set as string or object', () => {
      const redElement = createElement.div({ style: 'color: red' });
      const blueElement = createElement.div({ style: { color: 'blue'} });

      return assert(redElement.style === 'color: red' && blueElement.style.color === 'blue');
    });
  });

  describe('Style class generator', () => {
    test('returns a class name', () => {
      const className = styleClass('');

      return assert(typeof className === 'string' && Number.isNaN(parseInt(className[0])));
    });

    test('generates a style tag in document head', () => {
      const def = 'display: block';
      const className = styleClass(def);
      const style = document.head.children.find(i => i.innerHTML.includes(className));

      return assert(style.tagName === 'STYLE' && style.innerHTML === '.' + className + ' {display: block}');
    });

    test('accept nested definitions', () => {
      var className = styleClass(`
        cursor: pointer;
        &:hover { background: gray }
        & img.helper { display: inline-block }
      `);
      const style = document.head.children.find(i => i.innerHTML.includes(className));

      return assert(style.innerHTML.includes('.' + className + ':hover') && style.innerHTML.includes('.' + className + ' img.helper'));
    });
  });

  describe('Watch and Dispatch', () => {
    test('watch creates an event listener that call a function if dispatched', () => {
      let expected = 'old value';

      watch('test', value => expected = value);
      dispatch('test', 'new value');

      return assert(expected === 'new value');
    });

    test('everytime the watch function is invoked, a listener is created', () => {
      let old1 = 'old value 1';
      let old2 = 'old value 2';
      let old3 = 'old value 3';

      watch('test', value => old1 = value);
      watch('test', value => old2 = value);
      watch('diff', value => old3 = value);
      dispatch('test', 'new value');

      return assert(old1 === 'new value' && old2 === 'new value' && old3 === 'old value 3');
    });

    test('watch an event that already belongs to a group will replace him', () => {
      let old1 = 'old value 1';
      let old2 = 'old value 2';

      watch('test', value => old1 = value, 'group');
      watch('test', value => old2 = value, 'group');
      dispatch('test', 'new value');

      return assert(old1 === 'old value 1' && old2 === 'new value');
    });

    test('blank string event will be dispatched everytime', () => {
      let messages = [];

      watch('', msg => messages.push(msg));
      dispatch('test 1', 'some message');
      dispatch('test 2', 'another message');
      dispatch('test 3', 'last message');

      return assert(messages.length === 3);
    });
  });

  describe('Connect', () => {
    test('watch the function and send first prop as parameter if dispatched', () => {
      const { div } = createElement; 
      let msg = null;

      function TestComponent({ message }) {
        msg = message;
        return div();
      }

      connect(TestComponent)();
      dispatch(TestComponent, { message: 'New message' });

      return assert(msg === 'New message');
    });

    test('connected functions receive dispatched messages merged by new props', () => {
      const { div } = createElement; 
      let receivedProps = null;

      dispatch('foo', 'bar');

      function TestComponent(props) {
        receivedProps = props;
        return div();
      }

      connect(TestComponent)();
      dispatch(TestComponent, { message: 'New message' });

      return assert(receivedProps.foo && receivedProps.message);
    });

    test('dom element will be replaced everytime function is dispatched', () => {
      const { div, span } = createElement; 

      function TestComponent({ showSpan }) {
        return showSpan ? span() : div();
      }

      const connectedElement = connect(TestComponent)();
      const initialElementTagName = connectedElement.children[0].tagName;

      dispatch(TestComponent, { showSpan: true });
      const updatedElementTagName = connectedElement.children[0].tagName;

      return assert(initialElementTagName === 'DIV' && updatedElementTagName === 'SPAN');
    });

    test('update if a listener string event is dispatched', () => {
      const { div } = createElement; 
      let receivedProps = null;

      function TestComponent(props) {
        receivedProps = props;
        return div();
      }

      connect('eventstring', TestComponent)();
      dispatch('eventstring', 'Event dispatched');

      return assert(receivedProps.eventstring === 'Event dispatched');
    });

    test('listen multiple events', () => {
      const { div } = createElement; 
      let p = null;


      function TestComponent(props) {
        p = props;
        return div();
      }

      connect(['event1', 'event2'], TestComponent)();
      dispatch('event1', '1 OK');
      dispatch('event2', '2 OK');
      dispatch(TestComponent, { msg: 'OK' });

      return assert(p.event1 === '1 OK' && p.event2 === '2 OK' && p.msg === 'OK');
    });
  });

  describe('Router', () => {
    test('window.onhashchange dispatch a watched hashchange event', () => {
      router({});

      return assert(window.onhashchange.name === dispatch.bind(undefined).name);
    });

    test('call index if no hash route', () => {
      var index_called = false;

      router({ index: () => index_called = true });

      return assert(index_called);
    });

    test('call defined route object prop based on route', () => {
      var home_called = false;
      
      router({ home: () => home_called = true });
      window.location.hash = '#/home';
      window.onhashchange();

      return assert(home_called);
    });

    test('set props to route function based on route path', () => {
      var user_id;
      
      router({ '/user/{id}': (id) => user_id = id });
      window.location.hash = '#user/10';
      window.onhashchange();

      return assert(user_id === '10');
    });
  });

  done();
})(function init() {
  global.results = [];
  global.window = { location: { hash: '' } };
  global.Node = function Node(attr) { return Object.assign(this, attr) };
  global.DOMParser = function DOMParser() {
    return { parseFromString: function(str) {
      return { body: { firstChild: global.document.createElement(str.match(/<(.*) \/>/)[1]) } };
    }};
  };
  global.document = {
    createElement: function(tag) {
      return new global.Node({
        constructor: function HTMLElement() {},
        tagName: tag.toUpperCase(), children: [], innerHTML: '',
        parentNode: { replaceChild: function(neo, old) { Object.assign(old, neo) } },
        isEqualNode: function() { return false },
        setAttribute: function(attr, value) { this[attr] = value },
        appendChild: function(child) { typeof child === 'string' ? (this.innerHTML = child) : this.children.push(child) }
      });
    },
    createTextNode: function(text) { return text },
    createDocumentFragment: function(text) { return text },
    head: {
      children: [],
      appendChild: function(child) { global.document.head.children.push(child) }
    }
  };
  global.setTimeout = function(func) { func() }
  return global;
},
function describe(text, func) { console.group('\n\x1b[37m', text); func(); console.groupEnd() },
function test(text, func) { console.log(func(), '\x1b[90m', text, '\x1b[37m') },
function assert(sentence) { return results.push(sentence) && sentence ? '\x1b[32m✓' : '\x1b[31m✗' },
function done() { console.info('\n\x1b[32mTOTAL PASS:', results.filter(i=>i).length, '\n\x1b[31mTOTAL FAIL:', results.filter(i=>!i).length) });
