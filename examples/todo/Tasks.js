import Nozes from '../../nozes.js';
import { store, events } from './index.js';

const { ul, li, a } = Nozes;

function Tasks() {
  let me;

  events.on('add', () => {
    me.replaceWith(me=Tasks());
  });

  events.on('remove', i => {
    store.tasklist.splice(i, 1);
    me.replaceWith(me=Tasks());
  });

  events.on('reverse', () => {
    store.tasklist = store.tasklist.reverse();
    me.replaceWith(me=Tasks());
  });

  return me=ul(
    ...store.tasklist.map((text, i) =>
      li(
        text,
        a({ style: 'float: right', onclick: () => events.emit('remove', i) }, 'X')
      )
    )
  );
}

export default Tasks;
