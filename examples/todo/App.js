import Nozes from '../../nozes.js';
import { store } from './index.js';

import InputForm from './InputForm.js';
import Tasks from './Tasks.js';
import Footer from './Footer.js';

const { div, h1 } = Nozes;

function App() {
  return div(
    h1('Todo List'),
    InputForm(),
    Tasks(),
    Footer()
  );
}

export default App;
