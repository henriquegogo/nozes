import Nozes from '../../nozes.js';
import { store, events } from './index.js';

const { div, button, b, span } = Nozes;

function Footer() {
  let me;

  events.on('add', () => {
    me.replaceWith(me=Footer());
  });

  events.on('remove', () => {
    me.replaceWith(me=Footer());
  });

  return me=div(
    button({ style: 'float: right', onclick: () => events.emit('reverse') }, 'Reverse'),
    b('Total: '), span(store.tasklist.length)
  )
}

export default Footer;
