import Elements, { watch, dispatch } from '../../nozes.js';
import InputForm from './InputForm.js';
import Tasks from './Tasks.js';

const { div, h1 } = Elements;

function App() {
  watch('tasklist', console.log);
  watch('', () => console.log('Something dispatched'));

  return div(
    h1('Todo List'),
    InputForm(),
    Tasks()
  );
}

export default App;
