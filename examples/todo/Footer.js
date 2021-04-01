import { createElement, dispatch, connect } from '../../nozes.mjs';
const { div, button, b } = createElement;

function Footer({ tasklist = [] }) {

  function reverse() {
    dispatch('tasklist', tasklist.reverse());
  }

  return div(
    button({ style: 'float: right', onclick: reverse }, 'Reverse'),
    b('Total: '), tasklist.length
  );
}

export default connect('tasklist', Footer);
