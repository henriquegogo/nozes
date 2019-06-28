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

## Watch and dispatch
```javascript
document.body.appendChild(
  watch('notify sayHello', function() {
    return div('Hello, world');
  });
);
```
The "watch" function can be used to attach an "element updater" event. It's just a wrapper for a function that return an Element that update its reference every time "dispatch" is called. You can use multiple watch/dispatch events just with spaces between them.
```javascript
dispatch('notify');
```

## Full example
```javascript
// Message.js
import { store } from './App.js';
import Nozes, { watch } from './nozes.js';
const { div, b, span } = Nozes;

function Message() {
  return div(
    b('Message: '),
    span(store.message)
  );
}

export default watch('notify', Message);
```
```javascript
// Notifier.js
import { store } from './App.js';
import Nozes, { dispatch } from './nozes.js';
const { button } = Nozes;

function Notifier() {
  const handleClick = () => {
    store.message = 'you are notified';
    dispatch('notify');
  }

  return button('Notify message');
}

export default Notifier;
```
```javascript
// App.js
import Nozes from './nozes.js';
import Message from './Message.js';
import Notifier from './Notifier.js';
const { div, h1 } = Nozes;

export const store = { message: 'no message' };

function App() {
  return div(
    h1('Messenger'),
    Notifier(),
    Message()
  );
}

document.body.appendChild(App());
```
More examples in 'examples' folder

## Why 'Nozes'?
It's a joke, an old brazilian meme called "As árvores somos nozes", that could be translated as "The tree are us". Nozes it's about DOM tree.

## Special thanks
(Bruno Facundo)[http://github.com/BrunoFacundo] that tested first implementations, suggested improves and did pair programming on "watch" and "dispatch" implementations.

## License
MIT
