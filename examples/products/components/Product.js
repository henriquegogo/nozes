import Elements, { connect, dispatch, store } from '../../../nozes.js';
const { section, h1, p } = Elements;

function Product(product) {
  product = store.product || product;

  if (!this.isConnected && product.id && !product.title) {
    fetch('./api/products')
      .then(res => res.json())
      .then(res => dispatch('product', res[product.id - 1]));
  }

  return section(
    h1(product.title),
    p(product.img)
  );
}

export default connect('product', Product);
