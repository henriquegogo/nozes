// Message.js
import Elements, { connect } from '../../nozes.js';
const { div, b, span } = Elements;

function Message(message) {
  return div(
    b('Message: '),
    span(message)
  );
}

export default connect('notify', Message);
