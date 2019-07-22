import Elements, { connect, watch, dispatch } from '../../nozes.js';
const { ul, li, a } = Elements;

function Tasks(tasklist = []) {
  function add(item) {
    Array.isArray(item) ? tasklist = tasklist.concat(item) : tasklist.push(item);
    dispatch('tasklist', tasklist);
  }

  function remove(i) {
    tasklist.splice(i, 1);
    dispatch('tasklist', tasklist);
  }

  !this && watch('add', add);

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
