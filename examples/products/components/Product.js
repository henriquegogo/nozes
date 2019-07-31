import Elements, { connect, dispatch } from '../../../nozes.js';
const { section, h1, p } = Elements;

function Product(product = {}) {
  if (!this && product.id && !product.title) {
    fetch('./api/products')
      .then(res => res.json())
      .then(res => dispatch('product', res[product.id]));
  }

  return section(
    h1(product.title),
    p(product.img)
  );
}

export default connect('product', Product);
