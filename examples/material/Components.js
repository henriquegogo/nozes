import Nozes from '../../nozes.js';
const { div, button } = Nozes;

export function Appbar() {
  return div({ className: 'mui-appbar mui--appbar-line-height' }, ...arguments);
}

export function Container() {
  return div({ className: 'mui-container' }, ...arguments);
}

export function Button() {
  const classNames = arguments[0].type && arguments[0].type.split(' ').map(name => 'mui-btn--'+name).join(' ');
  return button({ className: 'mui-btn ' + classNames }, ...arguments);
}
