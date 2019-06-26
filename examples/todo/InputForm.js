import Nozes from '../../nozes.js';
import { events } from './index.js';

const { form, input } = Nozes;

function InputForm() {
  const handleChange = e => {
    events.emit('add', e.target.value);
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
