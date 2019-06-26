import Nozes from '../../nozes.js';
import { store, dispatch } from './index.js';

const { form, input } = Nozes;

function InputForm() {
  const handleChange = e => {
    store.tasklist.push(e.target.value);
    dispatch('add');
    e.target.value = '';
  };

  return input({
    id: 'task',
    placeholder: 'Type a task',
    style: 'width: 476px',
    onchange: handleChange,
    autofocus: true
  });
}

export default InputForm;
