// Message.js
import Nozes, { watch } from '../../nozes.js';
const { div, b, span } = Nozes;

function Message(message) {
  return div(
    b('Message: '),
    span(message)
  );
}

export default watch('notify', Message);
