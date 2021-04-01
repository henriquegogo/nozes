import { createElement, watch, dispatch } from '../../nozes.mjs';
import InputForm from './InputForm.js';
import Tasks from './Tasks.js';
const { div, h1 } = createElement;

function App() {
  watch('tasklist', console.log);
  watch('', () => console.log('Something dispatched'));

  return div(
    h1('Todo List'),
    InputForm(),
    Tasks()
  );
}

document.body.appendChild(App());
