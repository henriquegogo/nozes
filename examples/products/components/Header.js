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
