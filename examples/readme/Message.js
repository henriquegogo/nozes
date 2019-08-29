// Message.js
import Elements, { connect, store } from '../../nozes.js';
const { div, b } = Elements;

function Message(message) {
  message = store().message || message;

  return div(
    b('Message: '),
    message
  );
}

export default connect('message', Message);
