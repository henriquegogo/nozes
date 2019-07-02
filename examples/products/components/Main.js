import Nozes from '../../../nozes.js';
const { main, section, span } = Nozes;

import Categories from './Categories.js';

function Main() {
  return main(
    section(
      Categories(),
      span('Nada')
    )
  );
}

export default Main;
