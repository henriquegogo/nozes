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
      return a({ href: '#' }, img({ src: item.img }), span$1(item.label));
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

  var list = [{ img: celulares, label: 'Celulares e Telefones' }, { img: brinquedos, label: 'Brinquedos' }, { img: informatica, label: 'Informática' }, { img: som, label: 'Som e Áudio' }, { img: eletroportateis, label: 'Eletroportáteis' }, { img: decoracao, label: 'Decoração' }, { img: moda, label: 'Moda e Beleza' }, { img: livros, label: 'Jogos, Livros e Filmes' }, { img: papelaria, label: 'Papelaria e Escritório' }];

  var ul = Nozes.ul,
      li = Nozes.li,
      img$1 = Nozes.img,
      span$2 = Nozes.span;


  function ProductsList() {
    return ul.apply(undefined, [{ className: 'products' }].concat(_toConsumableArray(list$1.map(function (item) {
      return li(img$1(item.img), span$2(item.label));
    }))));
  }

  var list$1 = [{ img: '', label: 'Product 1' }, { img: '', label: 'Product 2' }, { img: '', label: 'Product 3' }, { img: '', label: 'Product 4' }, { img: '', label: 'Product 5' }, { img: '', label: 'Product 6' }, { img: '', label: 'Product 7' }, { img: '', label: 'Product 8' }, { img: '', label: 'Product 9' }];

  var main = Nozes.main,
      section$1 = Nozes.section;


  function Main() {
    return main(section$1(Categories(), ProductsList()));
  }

  var div$2 = Nozes.div,
      footer = Nozes.footer;


  function App() {
    return div$2(Header(), Main(), footer());
  }

  document.body.appendChild(App());
})();
