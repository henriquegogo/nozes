import Elements, { connect, dispatch } from '../../../nozes.js';
const { div, a, img, h1, h4 } = Elements;

function ProductsList({ products = [] }) {

  if (!this.isConnected) {
    fetch('./api/products')
      .then(res => res.json())
      .then(products => dispatch('products', products));
  }

  return div(
    h1('Novidades'),
    div({ className: 'products' },
      ...products.map((item, i) =>
        a({ href: '#/product/' + (i+1) },
          img({ src: item.img }),
          h4(item.title),
          item.description
        )
      )
    )
  );
}

export default connect('products', ProductsList);
