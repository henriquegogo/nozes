import Nozes from '../../nozes.js';
import { Container } from './Components.js';

const { h1 } = Nozes;

function App() {
  return Container(
    h1('Material Design')
  );
}

export default App;
