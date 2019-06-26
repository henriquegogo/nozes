const Nozes = {};
"a abbr address area article aside b base bdi bdo blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param pre progress q rb rp rt rtc ruby s samp script section select small source span strong style sub summary sup table tbody td template textarea tfoot th thead time title tr track u ul video wbr".split(" ").forEach(tag => {
  Nozes[tag] = function(...props) {
    const element = document.createElement(tag);
    props.forEach(child => {
      child.constructor === Object ? Object.assign(element, child) :
      child.constructor === String || child.constructor === Number ? element.innerText = child :
      child.constructor.name.includes('Element') ? element.appendChild(child) : null;
    });
    return element;
  }
});
export default Nozes;

const container = document.createDocumentFragment();

export function watch(events, func) {
  return (...props) => {
    let element = func(...props);
    events.split(' ').forEach(name => container.addEventListener(name, () => {
      const updated = func(...props);
      if (!element.isEqualNode(updated)) element.replaceWith(element=updated);
    }));
    return element;
  }
}

export function dispatch(name, data) {
  container.dispatchEvent(new CustomEvent(name));
}
