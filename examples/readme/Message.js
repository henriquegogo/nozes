// Message.js
import Elements, { connect } from '../../nozes.js';
const { div, b } = Elements;

function Message({ message }) {

  return div(
    b('Message: '),
    message
  );
}

export default connect('message', Message);
