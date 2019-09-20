import { createElement, dispatch, connect } from '../init.js';
const { div, img, a } = createElement;

function Categories({ categories = [] }) {

  if (!this.isConnected) {
    fetch('./api/categories')
      .then(res => res.json())
      .then(categories => dispatch('categories', categories));
  }

  return div({ className: 'categories' },
    ...categories.map(item =>
      a({ href: '#/category/' + item.id },
        img({ src: item.img }),
        item.label
      )
    )
  );
}

export default connect('categories', Categories);
