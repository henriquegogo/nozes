const { dispatch, input } = Nozes;

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
