import Nozes from '../../nozes.js';
import { store, when, dispatch } from './index.js';

const { div, button, b, span } = Nozes;

function Footer() {
  const reverse = () => {
    store.tasklist = store.tasklist.reverse();
    dispatch('reverse');
  };

  return when('add remove',
    div(
      button({ style: 'float: right', onclick: reverse }, 'Reverse'),
      b('Total: '), span(store.tasklist.length)
    ),
    Footer);
}

export default Footer;
