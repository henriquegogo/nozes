import Nozes from '../../../nozes.js';
const { div, span, img, a } = Nozes;

function Categories() {
  return div({ className: 'categories' },
    a({ href: '#' },
      img({ src: celulares }),
      span('Celulares e Telefones')
    ),
    a({ href: '#' },
      img({ src: brinquedos }),
      span('Brinquedos')
    ),
    a({ href: '#' },
      img({ src: informatica }),
      span('Informática')
    ),
    a({ href: '#' },
      img({ src: som }),
      span('Som e Áudio')
    ),
    a({ href: '#' },
      img({ src: eletroportateis }),
      span('Eletroportáteis')
    ),
    a({ href: '#' },
      img({ src: decoracao }),
      span('Decoração')
    ),
    a({ href: '#' },
      img({ src: moda }),
      span('Moda e Beleza')
    ),
    a({ href: '#' },
      img({ src: livros }),
      span('Jogos, Livros e Filmes')
    ),
  );
}

export default Categories;

const imgsrc = 'https://static-images.ifood.com.br/image/upload/f_auto/discoveries/19C1-marmita.jpg';
const celulares = 'https://images-submarino.b2w.io/spacey/2019/02/26/atalho_celulares-galaxys8.png';
const brinquedos = 'https://ae01.alicdn.com/kf/HTB1zxM9QFXXXXbDaXXXq6xXFXXXl/Brinquedos-do-beb-Musical-Instruments-17-cm-Batendo-Brinquedos-Bebe-Infantil-Pato-Amarelo-Brinquedo-Eletr-nico.jpg';
const informatica = 'https://www.pontofrio-imagens.com.br/Informatica/Computadores/14449914/1065518711/computador-imac-core-i3-4gb-de-memoria-hd-1tb-215-quot-led-mc509bz-a-apple-computador-apple-imac-ci3-4-1t-215-quot-mc509bz-a-14449914.jpg'
const som = 'https://www.casasbahia-imagens.com.br/audio/Caixa-de-Som-Portatil/12531579/895071478/caixa-de-som-portatil-jbl-boombox-com-bluetooth-connect-a-prova-dagua-preta-12531579.jpg';
const eletroportateis = 'https://http2.mlstatic.com/eletroportateis-liquidificador-10-veloc-pulsar-mondial-110v-D_NQ_NP_943217-MLB28982135797_122018-F.jpg';
const decoracao = 'https://www.e-cadeiras.com.br/ccstore/v1/images/?source=/file/v1253837277991717647/products/cadeira%20eames%20preta%20-%20deeapr-1263-1.jpg&height=475&width=475';
const moda = 'https://http2.mlstatic.com/vestido-xadrez-roupas-femininas-pronta-entrega-D_NQ_NP_697104-MLB27236349465_042018-Q.jpg';
const livros = 'https://openbookphilly.com/wp-content/uploads/2016/11/bookstack.png';
