import InputForm from './InputForm.js';
import Tasks from './Tasks.js';

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
