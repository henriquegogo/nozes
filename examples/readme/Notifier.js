// Notifier.js
import { createElement, dispatch } from './init.js';
const { button } = createElement;

function Notifier() {
  const handleClick = () => {
    dispatch('message', 'you are notified');
  }

  return button({ onclick: handleClick }, 'Notify message');
}

export default Notifier;
