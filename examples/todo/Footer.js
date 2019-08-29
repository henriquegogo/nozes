import Elements, { connect, dispatch, store } from '../../nozes.js';
const { div, button, b } = Elements;

function Footer() {
  let tasklist = store().tasklist || [];

  function reverse() {
    dispatch('tasklist', tasklist.reverse());
  }

  return div(
    button({ style: 'float: right', onclick: reverse }, 'Reverse'),
    b('Total: '), tasklist.length
  );
}

export default connect('tasklist', Footer);
