// Notifier.js
import Elements, { dispatch } from '../../nozes.js';
const { button } = Elements;

function Notifier() {
  const handleClick = () => {
    dispatch('message', 'you are notified');
  }

  return button({ onclick: handleClick }, 'Notify message');
}

export default Notifier;
