import Nozes from '../../nozes.js';
const { form, input } = Nozes;

function InputForm(add) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { input_task } = e.target;
    add(input_task.value);
  };

  return form({ id: 'form_task', onsubmit: handleSubmit },
    input({
      id: 'input_task',
      placeholder: 'Type a task',
      style: 'width: 476px',
      autofocus: true
    })
  );
}

export default InputForm;
