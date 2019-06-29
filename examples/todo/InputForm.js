import Nozes, { watch, dispatch } from '../../nozes.js';
const { input } = Nozes;

function InputForm(tasklist = []) {
  const handleChange = e => {
    tasklist.push(e.target.value);
    dispatch('tasklist', tasklist);
    e.target.value = '';
    window.inputTask.focus();
  };

  return input({
    id: 'inputTask',
    placeholder: 'Type a task',
    style: 'width: 476px',
    onchange: handleChange,
    autofocus: true
  });
}

export default watch('tasklist', InputForm);
