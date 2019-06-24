const Forro = {};
"a abbr address area article aside b base bdi bdo blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param pre progress q rb rp rt rtc ruby s samp script section select small source span strong style sub summary sup table tbody td template textarea tfoot th thead time title tr track u ul video wbr".split(" ").forEach(tag => {
  Forro[tag] = function(...children) {
    const element = document.createElement(tag);
    if (children[0] && children[0].constructor === Object) Object.assign(element, children[0]);
    children.forEach(child => {
      child.constructor === String || child.constructor === Number ? element.innerText = child :
      child.constructor !== Object ? element.appendChild(child) : null;
    });
    element.replaceWith = element.replaceWith || function(update) { // Polyfill
      return element.parentNode.replaceChild(update, element);
    }
    return element;
  }
});
export default Forro;
