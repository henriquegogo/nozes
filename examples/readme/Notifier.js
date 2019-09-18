// Notifier.js
const { dispatch, button } = Nozes;

function Notifier() {
  const handleClick = () => {
    dispatch('message', 'you are notified');
  }

  return button({ onclick: handleClick }, 'Notify message');
}

export default Notifier;
