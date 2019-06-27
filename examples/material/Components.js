import Nozes from '../../nozes.js';
const { div } = Nozes;

export function Container() {
  return div({ className: 'mui-container' }, ...arguments);
}
