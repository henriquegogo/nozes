// Notifier.js
import { store } from './App.js';
import Nozes, { dispatch } from '../../nozes.js';
const { button } = Nozes;

function Notifier() {
  const handleClick = () => {
    store.message = 'you are notified';
    dispatch('notify');
  }

  return button({ onclick: handleClick }, 'Notify message');
}

export default Notifier;
