import Elements from '../../../nozes.js';
const { div, a, img, h1, h4, span } = Elements;

function ProductsList() {
  return div(
    h1('Novidades'),
    div({ className: 'products' },
      ...list.map((item, i) =>
        a({ href: '#/product/' + (i+1) + '/view' },
          img({ src: item.img }),
          h4(item.title),
          span(item.description)
        )
      )
    )
  );
}

export default ProductsList;

const batom = 'https://cdn.shopify.com/s/files/1/1495/0402/products/1_be3b6eb3-dbdf-44ca-9c35-c5c4eff53e2e_grande.jpg';
const sabonete = 'https://jnj-content-lab.brightspotcdn.com/dims4/default/31d7d80/2147483647/strip/true/crop/2000x2000+0+0/resize/360x360!/quality/90/?url=https%3A%2F%2Fjnj-content-lab.brightspotcdn.com%2F5d%2F28%2Ff1bb2b1a493b86050d928f3dcff3%2Fj-babu-golden-new-pump.png';
const celular = 'https://4.imimg.com/data4/BB/RH/MY-15241145/multimedia-mobile-phone-500x500.jpg';

const list = [
  { img: batom, title: 'Product 1', description: 'Lorem ipsum sicut dixit dolor lamen ourives tchan' },
  { img: sabonete, title: 'Product 2', description: 'Lorem ipsum sicut dixit dolor lamen ourives tchan' },
  { img: celular, title: 'Product 3', description: 'Lorem ipsum sicut dixit dolor lamen ourives tchan' },
  { img: batom, title: 'Product 4', description: 'Lorem ipsum sicut dixit dolor lamen ourives tchan' },
  { img: sabonete, title: 'Product 5', description: 'Lorem ipsum sicut dixit dolor lamen ourives tchan' },
  { img: celular, title: 'Product 6', description: 'Lorem ipsum sicut dixit dolor lamen ourives tchan' },
  { img: batom, title: 'Product 7', description: 'Lorem ipsum sicut dixit dolor lamen ourives tchan' },
  { img: sabonete, title: 'Product 8', description: 'Lorem ipsum sicut dixit dolor lamen ourives tchan' },
  { img: celular, title: 'Product 9', description: 'Lorem ipsum sicut dixit dolor lamen ourives tchan' }
];
