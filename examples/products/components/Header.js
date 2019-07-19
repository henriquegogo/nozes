import Elements from '../../../nozes.js';
const { header, section, div, h1, input, i, label, span } = Elements;

function Header() {
  return header(
    section(
      h1('SHOPPS'),
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

export default Header;
