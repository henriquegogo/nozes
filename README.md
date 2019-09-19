# Nozes
Declarative way to create plain javascript components

## Elements

Has a constructor for each HTML tag that receive parameters that could be objects, functions, strings, numbers or HTML element instances.

The return of any of these constructors are HTML elements created with document.createElement function.

- If a parameter is an object, their attributes will be assigned to that element.
- If it's another HTML element, this will be appended as child of that.
- If it's a string or a number, a TextNode will be created with the value and appended as child of the element.
- If a function, it'll be called with the element as first parameter.

```javascript
div(
  h1('hello, world'),
  a({ href: '#' }, 'click here'),
  function(me) { console.log("ref:", me) }
)
```

## Watch

Create an event listener that call a function if dispatched. An event can belong to a group.

Every time the watch function is invoked, a listener is created  unless the event belong to a specific group that already exists. In this case, just the callback function will be replaced.

An event can be a blank string. In this case, this listener will be called everytime any event is dispatched.

```javascript
watch('log', alert, 'view');          // A listener was created with a group
watch('print', console.log);          // Another listener was created
watch('log', document.write, 'view'); // That first listener function was replaced
watch('print', console.log);          // Another listener was created (now this event will console.log two times)
watch('', alert);                     // Will call alert if any event is dispatched
```

## Dispatch

Call a function assigned to an event and pass a message as argument. These messages are stored internally as key/value (event/message) if the event value is a string.

If a message is an object, their attributes will be assigned to an previously stored object to that event.

A function or an object can be dispatched as event. In this case the Function.name or Object.name will be used as event and nothing will be stored.

```javascript
dispatch('log', 'Hello, view');
dispatch('print', 'Hello, console');
dispatch('person', { nick: 'Me' });        // Listener will receive { nick: 'Me' }
dispatch('person', { fingers: 5 });        // Listener will receive { nick: 'Me', fingers: 5 }
dispatch({ name: 'person' }, { age: 18 }); // The same listener will receive { age: 18 }
```

## Connect

The "connect" function can be used to attach an "element updater" event. It's just a wrapper for a function that return an Element that update its reference every time "dispatch" is called with current event. You can use multiple watch/dispatch events just with spaces between them os setting as array. Each connected function will set 'this' as the rendered element that should be updated on return. If it's the first call, 'this' is a document-fragment. You can verify if 'this' is rendered in DOM using WebAPI this.isConnected boolean.

```javascript
document.body.appendChild(
  connect(['notify', 'log'], function() {
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

## Examples

Examples in 'examples' folder

## Why 'Nozes'?
It's a joke, an old brazilian meme called "As árvores somos nozes", that could be translated as "The tree are us". Nozes it's about DOM tree.

## Special thanks
[Bruno Facundo](http://github.com/BrunoFacundo) that tested first implementations, suggested improvements and did pair programming on "watch / connect / dispatch" implementations.

## License
MIT
