import Nozes from '../../../nozes.js';
const { ul, li, img, span } = Nozes;

function ProductsList() {
  return ul({ className: 'products' },
    li(
      img(),
      span('Produto 1')
    ),
    li(
      img(),
      span('Produto 2')
    ),
    li(
      img(),
      span('Produto 3')
    ),
    li(
      img(),
      span('Produto 4')
    ),
    li(
      img(),
      span('Produto 5')
    ),
    li(
      img(),
      span('Produto 6')
    ),
    li(
      img(),
      span('Produto 7')
    ),
    li(
      img(),
      span('Produto 8')
    ),
  );
}

export default ProductsList;
