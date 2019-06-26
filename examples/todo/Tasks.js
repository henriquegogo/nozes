import Nozes from '../../nozes.js';
const { ul, li, a } = Nozes;

function Tasks(tasklist) {
  return ul(
    ...tasklist.map((text, i) =>
      li(
        text,
        a({ style: 'float: right', onclick: () => tasklist.remove(i) }, 'X')
      )
    )
  );
}

export default Tasks;
