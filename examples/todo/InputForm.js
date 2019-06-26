import Nozes, { watch, dispatch } from '../../nozes.js';
import { store } from './index.js';

const { form, input } = Nozes;

function InputForm() {
  const handleChange = e => {
    store.tasklist.push(e.target.value);
    dispatch('tasklist');
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
