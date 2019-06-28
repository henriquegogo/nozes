// Message.js
import { store } from './App.js';
import Nozes, { watch } from '../../nozes.js';
const { div, b, span } = Nozes;

function Message() {
  return div(
    b('Message: '),
    span(store.message)
  );
}

export default watch('notify', Message);
