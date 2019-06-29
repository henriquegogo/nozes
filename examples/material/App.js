import Nozes from '../../nozes.js';
import { Appbar, Container, Button } from './Components.js';
const { div, h1 } = Nozes;

function App() {
  return div(
    Appbar('Application title'),
    Container(
      h1('Material Design'),
      Button('Click'), Button({ type: 'primary raised' }, 'Click'), Button({ type: 'danger fab' }, '+')
    )
  );
}

export default App;
