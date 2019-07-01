import Nozes from '../../nozes.js';
const { div, footer } = Nozes;

import Header from './components/Header.js';
import Main from './components/Main.js';

function App() {
  return div(
    Header(),
    Main(),
    footer()
  );
}

export default App;
