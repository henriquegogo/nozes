// Message.js
import { createElement, connect } from '../../nozes.mjs';
const { div, b } = createElement;

function Message({ message }) {

  return div(
    b('Message: '),
    message
  );
}

export default connect('message', Message);
