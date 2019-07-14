import Nozes, { router } from '../../nozes.js';
const { div, footer } = Nozes;

import Header from './components/Header.js';
import Main from './components/Main.js';

function App() {
  return div(
    Header(),
    router({
      index: Main,
      category: param => div('Category ' + param),
      product: param => div('Product ' + param),
    }),
    footer()
  );
}

export default App;
