// App.js
import Elements from '../../nozes.js';
import Message from './Message.js';
import Notifier from './Notifier.js';
const { div, h1 } = Elements;

function App() {
  return div(
    h1('Messenger'),
    Notifier(),
    Message('no message yet')
  );
}

document.body.appendChild(App());
