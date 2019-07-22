import Elements, { dispatch } from '../../nozes.js';
const { input } = Elements;

setTimeout(() => dispatch('add', ['Async first item', 'Async second item']), 100);

function InputForm() {
  function handleChange(e) {
    dispatch('add', e.target.value);
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

export default InputForm;
