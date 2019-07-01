import Nozes from '../../nozes.js';
const { div, main, footer } = Nozes;

import Header from './components/Header.js';

function App() {
  return div(
    Header(),
    main(),
    footer()
  );
}

export default App;
