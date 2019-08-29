import Elements, { connect, watch, dispatch, store } from '../../nozes.js';
import Footer from './Footer.js';
const { div, ul, li, a } = Elements;

function Tasks() {
  let tasklist = store().tasklist || [];

  function add(item) {
    Array.isArray(item) ? tasklist = tasklist.concat(item) : tasklist.push(item);
    dispatch('tasklist', tasklist);
  }

  function remove(i) {
    tasklist.splice(i, 1);
    dispatch('tasklist', tasklist);
  }

  !this && watch('add', add);

  return div(
    ul(
      ...tasklist.map((text, i) =>
        li(
          text,
          a({ style: 'float: right', onclick: () => remove(i) }, 'X')
        )
      )
    ),
    Footer()
  );
}

export default connect('tasklist', Tasks);
