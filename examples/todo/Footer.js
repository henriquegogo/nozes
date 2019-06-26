import Nozes from '../../nozes.js';
const { div, button, b, span } = Nozes;

function Footer(tasklist) {
  return div(
    button({ style: 'float: right', onclick: tasklist.invert }, 'Reverse'),
    b('Total: '), span(tasklist.length)
  )
}

export default Footer;
