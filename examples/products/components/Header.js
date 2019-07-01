import Nozes from '../../../nozes.js';
const { header, section, div, h1, input, i, label, span } = Nozes;

function Header() {
  return header(
    section(
      h1('SHOPPING'),
      label(
        input({ type: 'search', placeholder: 'Estou procurando...' }),
        i({ className: 'icon search-icon' }, 'search')
      ),
      div(
        i({ className: 'icon' }, 'perm_identity'),
        span('User data')
      )
    )
  );
}

export default Header;
