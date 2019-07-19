import Nozes, { connect, dispatch } from '../../nozes.js';
const { div, button, b, span } = Nozes;

function Footer(tasklist = []) {
  function reverse() {
    dispatch('tasklist', tasklist.reverse());
  }

  return div(
    button({ style: 'float: right', onclick: reverse }, 'Reverse'),
    b('Total: '), span(tasklist.length)
  );
}

export default connect('tasklist', Footer);
