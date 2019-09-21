import { createElement, router } from '../../init.js';
const { div, main, footer } = createElement;

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
        product: param => Product({ id: param })
      })
    ),
    footer()
  );
}

document.body.appendChild(App());
