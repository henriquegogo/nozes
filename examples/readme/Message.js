// Message.js
import Nozes, { connect } from '../../nozes.js';
const { div, b, span } = Nozes;

function Message(message) {
  return div(
    b('Message: '),
    span(message)
  );
}

export default connect('notify', Message);
