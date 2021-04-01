import { createElement, dispatch } from '../../nozes.mjs';
const { input } = createElement;

setTimeout(() => dispatch('add', ['Async first item', 'Async second item']), 100);

function InputForm() {

  function handleChange(e) {
    dispatch('add', e.target.value);
    e.target.value = '';
  }

  return input({
    placeholder: 'Type a task',
    autofocus: true,
    onchange: handleChange
  });
}

export default InputForm;
