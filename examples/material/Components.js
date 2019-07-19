import Elements from '../../nozes.js';
const { div, button, span, ul, li, a } = Elements;

export function Appbar() {
  return div({ className: 'mui-appbar mui--appbar-line-height' }, ...arguments);
}

export function Container() {
  return div({ className: 'mui-container' }, ...arguments);
}

export function Caret() {
  return div({ className: 'mui-caret' }, ...arguments);
}

export function Button() {
  const classNames = arguments[0].type && arguments[0].type.split(' ').map(name => 'mui-btn--'+name).join(' ');
  return button({ className: 'mui-btn ' + classNames }, ...arguments);
}

export function Divider() {
  return div({ className: 'mui-divider' }, ...arguments);
}

export function Dropdown(label, list = []) {
  let selector = button({ className: 'mui-btn mui-btn--primary' }, span(label), span(' '), span({ className: 'mui-caret' }));
  selector.setAttribute('data-mui-toggle', 'dropdown');
  return div({ className: 'mui-dropdown' },
    selector,
    ul({ className: 'mui-dropdown__menu mui-dropdown__menu--right' },
      ...list.map(item => li(a({ href: '#' }, item)))
    )
  );
}
