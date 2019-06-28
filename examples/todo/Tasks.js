import Nozes, { watch, dispatch } from '../../nozes.js';
const { ul, li, a } = Nozes;

function Tasks(tasklist = []) {
  const remove = i => {
    tasklist.splice(i, 1);
    dispatch('tasklist', tasklist);
  };

  return ul(
    ...tasklist.map((text, i) =>
      li(
        text,
        a({ style: 'float: right', onclick: () => remove(i) }, 'X')
      )
    )
  );
}

export default watch('tasklist', Tasks);
