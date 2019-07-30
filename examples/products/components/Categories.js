import Elements from '../../../nozes.js';
const { div, img, a } = Elements;

function Categories() {
  return div({ className: 'categories' },
    ...list.map(item =>
      a({ href: '#/category/' + item.id },
        img({ src: item.img }),
        item.label
      )
    )
  );
}

export default Categories;

const celulares = 'https://static.carrefour.com.br/medias/sys_master/images/images/h11/h42/h00/h00/11652553474078.jpg';
const brinquedos = 'https://ae01.alicdn.com/kf/HTB1zxM9QFXXXXbDaXXXq6xXFXXXl/Brinquedos-do-beb-Musical-Instruments-17-cm-Batendo-Brinquedos-Bebe-Infantil-Pato-Amarelo-Brinquedo-Eletr-nico.jpg';
const informatica = 'https://www.pontofrio-imagens.com.br/Informatica/Computadores/14449914/1065518711/computador-imac-core-i3-4gb-de-memoria-hd-1tb-215-quot-led-mc509bz-a-apple-computador-apple-imac-ci3-4-1t-215-quot-mc509bz-a-14449914.jpg'
const som = 'https://www.casasbahia-imagens.com.br/audio/Caixa-de-Som-Portatil/12531579/895071478/caixa-de-som-portatil-jbl-boombox-com-bluetooth-connect-a-prova-dagua-preta-12531579.jpg';
const eletroportateis = 'https://http2.mlstatic.com/eletroportateis-liquidificador-10-veloc-pulsar-mondial-110v-D_NQ_NP_943217-MLB28982135797_122018-F.jpg';
const decoracao = 'https://www.e-cadeiras.com.br/ccstore/v1/images/?source=/file/v1253837277991717647/products/cadeira%20eames%20preta%20-%20deeapr-1263-1.jpg&height=475&width=475';
const moda = 'https://http2.mlstatic.com/vestido-xadrez-roupas-femininas-pronta-entrega-D_NQ_NP_697104-MLB27236349465_042018-Q.jpg';
const livros = 'https://openbookphilly.com/wp-content/uploads/2016/11/bookstack.png';
const papelaria = 'https://res-2.cloudinary.com/gaveteiro/image/upload/c_fit,h_1000,w_1000/v1432168667/mqosegda7m4oywj4m6ag.jpg';

const list = [
  { id: 'celulares', img: celulares, label: 'Celulares e Telefones' },
  { id: 'brinquedos', img: brinquedos, label: 'Brinquedos' },
  { id: 'informatica', img: informatica, label: 'Informática' },
  { id: 'som', img: som, label: 'Som e Áudio' },
  { id: 'eletroportateis', img: eletroportateis, label: 'Eletroportáteis' },
  { id: 'decoracao', img: decoracao, label: 'Decoração' },
  { id: 'moda', img: moda, label: 'Moda e Beleza' },
  { id: 'livros', img: livros, label: 'Jogos, Livros e Filmes' },
  { id: 'papelaria', img: papelaria, label: 'Papelaria e Escritório' }
];

