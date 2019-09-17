// Message.js
function Message({ message }) {

  return div(
    b('Message: '),
    message
  );
}

export default connect('message', Message);
