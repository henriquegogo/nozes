import { createElement } from '../../../init.js';
const { header, section, div, h1, input, i, label, a } = createElement;

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

export default Header;
