import Nozes from '../../../nozes.js';
const { main, section } = Nozes;

import Categories from './Categories.js';
import ProductsList from './ProductsList.js';

function Main() {
  return main(
    section(
      Categories(),
      ProductsList()
    )
  );
}

export default Main;
