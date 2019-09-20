import { createElement } from '../init.js';
const { section } = createElement;

import Categories from './Categories.js';
import ProductsList from './ProductsList.js';

function Main() {
  return section(
    Categories(),
    ProductsList()
  );
}

export default Main;
