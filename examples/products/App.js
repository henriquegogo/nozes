import Elements, { router } from '../../nozes.js';
const { div, main, section, footer } = Elements;

import Header from './components/Header.js';
import Main from './components/Main.js';
import Product from './components/Product.js';

function App() {
  return div(
    Header(),
    main(
      router({
        index: Main,
        category: param => div('Category ' + param),
        product: param => Product({ id: param }),
      })
    ),
    footer()
  );
}

export default App;
