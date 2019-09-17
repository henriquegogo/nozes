// App.js
import Elements, { watch, router } from '../../nozes.js';
import Message from './Message.js';
import Notifier from './Notifier.js';
const { div, br, a } = Elements;

function App() {
  watch('message', (message) => console.log(message));

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
    Message({ message: 'no message yet' })
  );
}

document.body.appendChild(App());
