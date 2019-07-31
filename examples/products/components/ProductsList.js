import Elements, { connect, dispatch } from '../../../nozes.js';
const { div, a, img, h1, h4 } = Elements;

function ProductsList(list = []) {
  if (!this) {
    fetch('./api/products')
      .then(res => res.json())
      .then(res => dispatch('products', res));
  }

  return div(
    h1('Novidades'),
    div({ className: 'products' },
      ...list.map((item, i) =>
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
