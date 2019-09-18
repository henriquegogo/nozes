// Message.js
const { connect, div, b } = Nozes;

function Message({ message }) {

  return div(
    b('Message: '),
    message
  );
}

export default connect('message', Message);
