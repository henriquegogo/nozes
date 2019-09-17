import Elements, { connect, dispatch } from '../../../nozes.js';
const { section, h1, p } = Elements;

function Product(product = {}) {

  if (!this.isConnected && product.id && !product.title) {
    fetch('./api/products')
      .then(res => res.json())
      .then(res => dispatch(Product, res[product.id - 1]));
  }

  return section(
    h1(product.title),
    p(product.img)
  );
}

export default connect(Product);
