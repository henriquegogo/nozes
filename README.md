# Nozes
Declarative way to create plain javascript components

## How to use
```javascript
div(
  h1('Hello, world'),
  a({ href: '#', onclick: function() { alert('clicked') } }, 'Click here')
)
```
All div(), h1(), a() and other "html tag" functions are just an easier way to return a document.createElement() and set parameters and attributes.

## Watch, dispatch and connect
```javascript
watch('log', function(message) {
  console.log(message)
});
```
The "watch" function will subscribe an event that can be invoked using "dispatch" function. The second argument of a dispatch function will be passed as first argument of watch function callback.
```javascript
dispatch('notify log', 'hello, world');
```
The "connect" function can be used to attach an "element updater" event. It's just a wrapper for a function that return an Element that update its reference every time "dispatch" is called with current event. You can use multiple watch/dispatch events just with spaces between them. Each connected function will set 'this' as the rendered element that should be updated on return. If it's the first call, 'this' is undefined.
```javascript
document.body.appendChild(
  connect('notify', function() {
    if (this) console.log('Element to be replaced:', this);
    else console.log('First time call. No old element reference');
    return div(Date().toString());
  });
);
```

## Router
```javascript
router({
  index: () => a({ href: '#/hello/world/earth' }, 'Home page'),
  hello: (param, name) => a({ href: '#' }, 'Hello, ' + param + ' (' + name + ')')
})
```
Router is a function with an object that defines routes and function callbacks that will be invoked when some hash router is called. Routes could receive multiple params: the first is the route itself and the others are parameters that will be used as arguments of route callback function.

## Full example
```javascript
// Message.js
import Elements, { connect } from '../../nozes.js';
const { div, b } = Elements;

function Message(message) {
  return div(
    b('Message: '),
    message
  );
}

export default connect('notify', Message);
```
```javascript
// Notifier.js
import Elements, { dispatch } from '../../nozes.js';
const { button } = Elements;

function Notifier() {
  const handleClick = () => {
    dispatch('notify log', 'you are notified');
  }

  return button({ onclick: handleClick }, 'Notify message');
}

export default Notifier;
```
```javascript
// App.js
import Elements, { watch, router } from '../../nozes.js';
import Message from './Message.js';
import Notifier from './Notifier.js';
const { div, br, a } = Elements;

function App() {
  watch('log', console.log);

  return div(
    a({ href: '#' }, 'Home'),
    ' | ',
    a({ href: '#/about' }, 'About'),
    router({
      index: () => div('Start page'),
      about: () => div('About page')
    }),
    br(),
    Notifier(),
    Message('no message yet')
  );
}

document.body.appendChild(App());
```
More examples in 'examples' folder

## Why 'Nozes'?
It's a joke, an old brazilian meme called "As árvores somos nozes", that could be translated as "The tree are us". Nozes it's about DOM tree.

## Special thanks
[Bruno Facundo](http://github.com/BrunoFacundo) that tested first implementations, suggested improvements and did pair programming on "watch / connect / dispatch" implementations.

## License
MIT
