import Nozes from '../../../nozes.js';
const { ul, li, img, span } = Nozes;

function ProductsList() {
  return ul({ className: 'products' },
    ...list.map(item =>
      li(
        img(item.img),
        span(item.label)
      )
    )
  );
}

export default ProductsList;

const list = [
  { img: '', label: 'Product 1' },
  { img: '', label: 'Product 2' },
  { img: '', label: 'Product 3' },
  { img: '', label: 'Product 4' },
  { img: '', label: 'Product 5' },
  { img: '', label: 'Product 6' },
  { img: '', label: 'Product 7' },
  { img: '', label: 'Product 8' },
  { img: '', label: 'Product 9' }
];
