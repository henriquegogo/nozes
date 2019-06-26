import Nozes, { watch, dispatch } from '../../nozes.js';
import { store } from './index.js';

const { ul, li, a } = Nozes;

function Tasks() {
  const remove = i => {
    store.tasklist.splice(i, 1);
    dispatch('tasklist');
  };

  return ul(
    ...store.tasklist.map((text, i) =>
      li(
        text,
        a({ style: 'float: right', onclick: () => remove(i) }, 'X')
      )
    )
  );
}

export default watch('tasklist', Tasks);
