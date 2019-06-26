import Nozes from '../../nozes.js';
import { store, when, dispatch } from './index.js';

const { ul, li, a } = Nozes;

function Tasks() {
  const remove = i => {
    store.tasklist.splice(i, 1);
    dispatch('remove');
  };

  return when('add remove reverse',
    ul(
      ...store.tasklist.map((text, i) =>
        li(
          text,
          a({ style: 'float: right', onclick: () => remove(i) }, 'X')
        )
      )
    ),
    Tasks);
}

export default Tasks;
