import Nozes, { watch, dispatch } from '../../nozes.js';
const { form, input } = Nozes;

function InputForm(tasklist = []) {
  const handleChange = e => {
    tasklist.push(e.target.value);
    dispatch('tasklist', tasklist);
    e.target.value = '';
  };

  return input({
    placeholder: 'Type a task',
    style: 'width: 476px',
    onchange: handleChange,
    autofocus: true
  });
}

export default watch('tasklist', InputForm);
