import Elements, { connect, dispatch } from '../../nozes.js';
const { ul, li, a } = Elements;

function Tasks(tasklist = []) {
  function remove(i) {
    tasklist.splice(i, 1);
    dispatch('tasklist', tasklist);
  }

  return ul(
    ...tasklist.map((text, i) =>
      li(
        text,
        a({ style: 'float: right', onclick: () => remove(i) }, 'X')
      )
    )
  );
}

export default connect('tasklist', Tasks);
