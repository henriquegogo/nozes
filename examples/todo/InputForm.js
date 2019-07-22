import Elements, { connect, dispatch } from '../../nozes.js';
const { input } = Elements;

setTimeout(() => dispatch('tasklist', ['Async first item', 'Async second item']), 100);

function InputForm(tasklist = []) {
  function handleChange(e) {
    tasklist.push(e.target.value);
    dispatch('tasklist', tasklist);
    window.inputTask.value = '';
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
