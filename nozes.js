(function() {
  var store = {}, listeners = [], Nozes = 'a abbr address area article aside b base bdi bdo blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param pre progress q rb rp rt rtc ruby s samp script section select small source span strong style sub summary sup table tbody td template textarea tfoot th thead time title tr track u ul video wbr n-connect'.split(' ').reduce(function(result, tag) {
    result[tag] = function() {
      var element = document.createElement(tag);
      [].slice.call(arguments).filter(function(arg) { return arg != null }).forEach(function(arg) {
        arg.constructor === Object ? Object.assign(element, arg) :
        arg.constructor === Function ? arg(element) :
        arg.constructor === String || arg.constructor === Number ? element.appendChild(document.createTextNode(arg)) :
        arg.constructor.name.includes('Element') && element.appendChild(arg);
      });
      return element;
    };
    return result;
  }, { watch: watch, dispatch: dispatch, connect: connect, router: router });
  function watch(event, func, group) {
    var found_event = listeners.find(function(listener) {
      return group !== undefined && listener.group === group && listener.event === event;
    });
    found_event ? Object.assign(found_event, { action: func }) : listeners.push({ event: event, action: func, group: group });
  }
  function dispatch(event, msg) {
    event.constructor === String && (msg = store[event] = msg.constructor === Object ? Object.assign({}, store[event], msg) : msg);
    listeners.forEach(function(listener) {
      if (listener.event === (event.name || event) || !listener.event) {
        listener.action(msg);
      }
    });
  }
  function connect(events, func) {
    events.constructor === Function ? (func = events, events = []) : !Array.isArray(events) && (events = [events]);
    return function(props) {
      var element = document.createDocumentFragment();
      events.concat(func.name).forEach(function(event) {
        watch(event = event.name || event, function(new_props) {
          var updated = func.call({ isConnected: true }, props = Object.assign({}, props, store, event === func.name && new_props));
          if (element != null && element.parentNode && updated instanceof Node && !element.isEqualNode(updated)) {
            element.parentNode.replaceChild(updated, element);
            element = updated;
          }
        }, func.name);
      });
      element = func.call({ isConnected: false }, props = Object.assign({}, props, store));
      return Nozes['n-connect']({ title: func.name }, element);
    }
  }
  function router(routes) {
    window.onhashchange = dispatch.bind(undefined, { name: 'hashchange' });
    return connect(function hashchange() {
      var path = window.location.hash.split('/');
      return path[1] && routes[path[1]] ? routes[path[1]].apply(undefined, path.slice(2)) : routes.index.apply(undefined, path.slice(2));
    })();
  }
  typeof module !== "undefined" ? module.exports = Nozes : window.Nozes = Nozes;
})();
