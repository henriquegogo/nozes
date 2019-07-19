import Elements, { connect, dispatch } from '../../nozes.js';
const { input } = Elements;

function InputForm(tasklist = []) {
  function handleChange(e) {
    tasklist.push(e.target.value);
    dispatch('tasklist', tasklist);
    window.inputTask.focus();
  }

  return input({
    id: 'inputTask',
    placeholder: 'Type a task',
    style: 'width: 476px',
    autofocus: true,
    onchange: handleChange
  });
}

export default connect('tasklist', InputForm);
