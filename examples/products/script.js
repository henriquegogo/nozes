(function() {
  var nozes = new Nozes();
  var watch = nozes.watch, dispatch = nozes.dispatch, connect = nozes.connect, router = nozes.router;
  Object.assign(window, nozes.createElement);

  function Header() {
    return header(
      section(
        a({ href: '#' }, h1('SHOPPS')),
        label(
          input({ type: 'text', placeholder: 'Estou procurando...' }),
          i({ className: 'icon search-icon' }, 'search')
        ),
        div(
          i({ className: 'icon' }, 'perm_identity')
        )
      )
    );
  }

  var Categories = connect('categories',
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
  );

  var ProductsList = connect('products',
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
  );

  var Product = connect(
    function Product(product = {}) {
      if (!this.isConnected && product.id && !product.title) {
        fetch('./api/products')
          .then(res => res.json())
          .then(res => dispatch(Product, res[product.id - 1]));
      }

      return section(
        h1(product.title),
        p(product.img)
      )
    }
  );

  function Main() {
    return section(
      Categories(),
      ProductsList()
    );
  }

  function App() {
    return div(
      Header(),
      main(
        router({
          index: Main,
          category: function(param) { return div('Category ' + param) },
          product: function(param) { return Product({ id: param }) }
        })
      ),
      footer()
    );
  }

  document.body.appendChild(App());
})();
