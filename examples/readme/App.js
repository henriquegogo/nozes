// App.js
import Elements, { watch, router } from '../../nozes.js';
import Message from './Message.js';
import Notifier from './Notifier.js';
const { div, span, br, a } = Elements;

function App() {
  watch('log', console.log);

  return div(
    a({ href: '#' }, 'Home'),
    span(' | '),
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
