import Elements, { connect, dispatch } from '../../../nozes.js';
const { div, img, a } = Elements;

function Categories(list = []) {
  if (!this) {
    fetch('./api/categories')
      .then(res => res.json())
      .then(res => dispatch('categories', res));
  }

  return div({ className: 'categories' },
    ...list.map(item =>
      a({ href: '#/category/' + item.id },
        img({ src: item.img }),
        item.label
      )
    )
  );
}

export default connect('categories', Categories);
