// App.js
import Nozes from '../../nozes.js';
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
