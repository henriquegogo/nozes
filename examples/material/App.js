import Elements from '../../nozes.js';
import { Appbar, Caret, Container, Button, Divider, Dropdown } from './Components.js';
const { div, h1 } = Elements;

function App() {
  return div(
    Appbar('Application title'),
    Container(
      h1('Material Design'),
      Caret(),
      Button('Click'), Button({ type: 'primary raised' }, 'Click'), Button({ type: 'danger fab' }, '+'),
      Divider(),
      Dropdown('Options', ['First option', 'Second option', 'Third'])
    )
  );
}

export default App;
