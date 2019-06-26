import Nozes, { watch, dispatch } from '../../nozes.js';
import { store } from './index.js';

const { div, button, b, span } = Nozes;

function Footer() {
  const reverse = () => {
    store.tasklist = store.tasklist.reverse();
    dispatch('tasklist');
  };

  return div(
    button({ style: 'float: right', onclick: reverse }, 'Reverse'),
    b('Total: '), span(store.tasklist.length)
  );
}

export default watch('tasklist', Footer);
