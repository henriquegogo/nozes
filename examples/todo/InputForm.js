import Nozes, { watch, dispatch } from '../../nozes.js';
const { input } = Nozes;

function InputForm(tasklist = []) {
  const handleChange = e => {
    tasklist.push(e.target.value);
    dispatch('tasklist', tasklist);
  };

  return input({
    placeholder: 'Type a task',
    style: 'width: 476px',
    autofocus: true,
    onchange: handleChange,
    onreset: function() { this.focus() }
  });
}

export default watch('tasklist', InputForm);
