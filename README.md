# Nozes
It's just a simpler way to create elements instead of use document.createElement()

## How to use
```javascript
div(
  h1('Hello, world'),
  a({ href='#' }, 'Click here')
)
```

## It's just that?
Yes. But you can do awesome things, like create plain javascript reactive components.
```javascript
import Nozes from './nozes.js';
const { div, h1, button, b } = Nozes;

function App(props) {
  let app;
  props = props || {};

  const alert = () => {
    app.replaceWith(app=App({ message: 'Hello, world' }));
  }

  return app=div(
    h1(props.message || 'No message'),
    div(
      b('Messenger: '),
      button({ onclick: alert }, 'Say something'),
    )
  );
}

document.body.appendChild(App());
```
More examples in 'examples' folder

## Why 'Nozes'?
It's a joke, an old brazilian meme called "As árvores somos nozes", that could be translated as "The tree are us". Nozes it's about DOM tree.

## Special thanks
Bruno Facundo <http://github.com/BrunoFacundo> that tested first implementations, suggested improves and did pair programming on "watch" and "dispatch" implementations.

## License
MIT
