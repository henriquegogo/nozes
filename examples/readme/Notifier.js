// Notifier.js
import Nozes, { dispatch } from '../../nozes.js';
const { button } = Nozes;

function Notifier() {
  const handleClick = () => {
    dispatch('notify', 'you are notified');
  }

  return button({ onclick: handleClick }, 'Notify message');
}

export default Notifier;
