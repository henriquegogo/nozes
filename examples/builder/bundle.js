"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  'use strict';

  var Nozes = {};
  "a abbr address area article aside b base bdi bdo blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param pre progress q rb rp rt rtc ruby s samp script section select small source span strong style sub summary sup table tbody td template textarea tfoot th thead time title tr track u ul video wbr".split(" ").forEach(function (tag) {
    Nozes[tag] = function () {
      var element = document.createElement(tag);
      [].slice.call(arguments).forEach(function (child) {
        if (child != null) {
          child.constructor === Object ? Object.assign(element, child) : child.constructor === String || child.constructor === Number ? element.innerText = child : child.constructor.name.includes('Element') ? element.appendChild(child) : null;
        }
      });
      return element;
    };
  });

  var container = document.createDocumentFragment();
  function watch(events, func) {
    return function () {
      var props = [].slice.call(arguments);
      var element = func.apply(null, props);
      events.split(' ').forEach(function (name) {
        container.addEventListener(name, function (e) {
          props[0] = props[0] && props[0].constructor === Object ? Object.assign(props[0], e.detail) : e.detail;
          var updated = func.apply(null, props);
          if (element != null && element.parentNode && (!element.isEqualNode(updated) || e.detail != null)) {
            element.parentNode.replaceChild(updated, element);
            element = updated;
          }
        });
      });
      return element;
    };
  }
  function dispatch(events, props) {
    events.split(' ').forEach(function (name) {
      container.dispatchEvent(new CustomEvent(name, { detail: props }));
    });
  }

  function router(routes) {
    window.onhashchange = dispatch.bind(null, 'route');
    return watch('route', function () {
      var route = location.hash.split('/');
      return route[1] && routes[route[1]] ? routes[route[1]](route[2]) : routes.index(route[2]);
    })();
  }

  var header = Nozes.header,
      section = Nozes.section,
      div = Nozes.div,
      h1 = Nozes.h1,
      input = Nozes.input,
      i = Nozes.i,
      label = Nozes.label,
      span = Nozes.span;


  function Header() {
    return header(section(h1('SHOPPS'), label(input({ type: 'text', placeholder: 'Estou procurando...' }), i({ className: 'icon search-icon' }, 'search')), div(i({ className: 'icon' }, 'perm_identity'))));
  }

  var div$1 = Nozes.div,
      span$1 = Nozes.span,
      img = Nozes.img,
      a = Nozes.a;


  function Categories() {
    return div$1.apply(undefined, [{ className: 'categories' }].concat(_toConsumableArray(list.map(function (item) {
      return a({ href: '#/category/' + item.id }, img({ src: item.img }), span$1(item.label));
    }))));
  }

  var celulares = 'https://static.carrefour.com.br/medias/sys_master/images/images/h11/h42/h00/h00/11652553474078.jpg';
  var brinquedos = 'https://ae01.alicdn.com/kf/HTB1zxM9QFXXXXbDaXXXq6xXFXXXl/Brinquedos-do-beb-Musical-Instruments-17-cm-Batendo-Brinquedos-Bebe-Infantil-Pato-Amarelo-Brinquedo-Eletr-nico.jpg';
  var informatica = 'https://www.pontofrio-imagens.com.br/Informatica/Computadores/14449914/1065518711/computador-imac-core-i3-4gb-de-memoria-hd-1tb-215-quot-led-mc509bz-a-apple-computador-apple-imac-ci3-4-1t-215-quot-mc509bz-a-14449914.jpg';
  var som = 'https://www.casasbahia-imagens.com.br/audio/Caixa-de-Som-Portatil/12531579/895071478/caixa-de-som-portatil-jbl-boombox-com-bluetooth-connect-a-prova-dagua-preta-12531579.jpg';
  var eletroportateis = 'https://http2.mlstatic.com/eletroportateis-liquidificador-10-veloc-pulsar-mondial-110v-D_NQ_NP_943217-MLB28982135797_122018-F.jpg';
  var decoracao = 'https://www.e-cadeiras.com.br/ccstore/v1/images/?source=/file/v1253837277991717647/products/cadeira%20eames%20preta%20-%20deeapr-1263-1.jpg&height=475&width=475';
  var moda = 'https://http2.mlstatic.com/vestido-xadrez-roupas-femininas-pronta-entrega-D_NQ_NP_697104-MLB27236349465_042018-Q.jpg';
  var livros = 'https://openbookphilly.com/wp-content/uploads/2016/11/bookstack.png';
  var papelaria = 'https://res-2.cloudinary.com/gaveteiro/image/upload/c_fit,h_1000,w_1000/v1432168667/mqosegda7m4oywj4m6ag.jpg';

  var list = [{ id: 'celulares', img: celulares, label: 'Celulares e Telefones' }, { id: 'brinquedos', img: brinquedos, label: 'Brinquedos' }, { id: 'informatica', img: informatica, label: 'Informática' }, { id: 'som', img: som, label: 'Som e Áudio' }, { id: 'eletroportateis', img: eletroportateis, label: 'Eletroportáteis' }, { id: 'decoracao', img: decoracao, label: 'Decoração' }, { id: 'moda', img: moda, label: 'Moda e Beleza' }, { id: 'livros', img: livros, label: 'Jogos, Livros e Filmes' }, { id: 'papelaria', img: papelaria, label: 'Papelaria e Escritório' }];

  var div$2 = Nozes.div,
      a$1 = Nozes.a,
      img$1 = Nozes.img,
      h1$1 = Nozes.h1,
      h4 = Nozes.h4,
      span$2 = Nozes.span;


  function ProductsList() {
    return div$2(h1$1('Novidades'), div$2.apply(undefined, [{ className: 'products' }].concat(_toConsumableArray(list$1.map(function (item, i) {
      return a$1({ href: '#/product/' + (i + 1) }, img$1({ src: item.img }), h4(item.title), span$2(item.description));
    })))));
  }

  var batom = 'https://cdn.shopify.com/s/files/1/1495/0402/products/1_be3b6eb3-dbdf-44ca-9c35-c5c4eff53e2e_grande.jpg';
  var sabonete = 'https://jnj-content-lab.brightspotcdn.com/dims4/default/31d7d80/2147483647/strip/true/crop/2000x2000+0+0/resize/360x360!/quality/90/?url=https%3A%2F%2Fjnj-content-lab.brightspotcdn.com%2F5d%2F28%2Ff1bb2b1a493b86050d928f3dcff3%2Fj-babu-golden-new-pump.png';
  var celular = 'https://4.imimg.com/data4/BB/RH/MY-15241145/multimedia-mobile-phone-500x500.jpg';

  var list$1 = [{ img: batom, title: 'Product 1', description: 'Lorem ipsum sicut dixit dolor lamen ourives tchan' }, { img: sabonete, title: 'Product 2', description: 'Lorem ipsum sicut dixit dolor lamen ourives tchan' }, { img: celular, title: 'Product 3', description: 'Lorem ipsum sicut dixit dolor lamen ourives tchan' }, { img: batom, title: 'Product 4', description: 'Lorem ipsum sicut dixit dolor lamen ourives tchan' }, { img: sabonete, title: 'Product 5', description: 'Lorem ipsum sicut dixit dolor lamen ourives tchan' }, { img: celular, title: 'Product 6', description: 'Lorem ipsum sicut dixit dolor lamen ourives tchan' }, { img: batom, title: 'Product 7', description: 'Lorem ipsum sicut dixit dolor lamen ourives tchan' }, { img: sabonete, title: 'Product 8', description: 'Lorem ipsum sicut dixit dolor lamen ourives tchan' }, { img: celular, title: 'Product 9', description: 'Lorem ipsum sicut dixit dolor lamen ourives tchan' }];

  var main = Nozes.main,
      section$1 = Nozes.section;


  function Main() {
    return main(section$1(Categories(), ProductsList()));
  }

  var div$3 = Nozes.div,
      footer = Nozes.footer;


  function App() {
    return div$3(Header(), router({
      index: Main,
      category: function category(param) {
        return div$3('Category ' + param);
      },
      product: function product(param) {
        return div$3('Product ' + param);
      }
    }), footer());
  }

  document.body.appendChild(App());
})();
