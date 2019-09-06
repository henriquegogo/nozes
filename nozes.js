var Elements = 'a abbr address area article aside b base bdi bdo blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param pre progress q rb rp rt rtc ruby s samp script section select small source span strong style sub summary sup table tbody td template textarea tfoot th thead time title tr track u ul video wbr n-connect'.split(' ').reduce(function(result, tag) {
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
}, {});

var store = {};
var listeners = [];

function watch(events, func, key) {
  events.constructor === Function ? (func = events, events = [func.name]) :
  events.constructor === String ? events = events.split(' ') : events;
  events.forEach(function(name) {
    var found_event = listeners.find(function(listener) { return key !== undefined && listener.key === key || listener.key === key.concat('_' + name) });
    if (found_event) {
      Object.assign(found_event, { event: name, action: func });
    } else {
      listeners.push({ event: name, action: func, key: key === name ? key : key && key.concat('_' + name) });
    }
  });
  console.log(listeners);
}

function dispatch(event, msg) {
  event.constructor === Function ? event = event.name :
    store[event] = store[event] && store[event].constructor === Object ? Object.assign(store[event], msg) : msg;
  listeners.forEach(function(listener) {
    if (listener.event === event || !listener.event) {
      listener.action(msg);
    }
  });
}

function connect(events, func) {
  events.constructor === Function ? (func = events, events = []) : events.constructor === String && (events = events.split(' '));
  events.push(func.name);
  return function() {
    var element = func.apply({ name: func.name, isConnected: false }, [].slice.call(arguments));
    watch(events, function() {
      var updated = func.apply({ name: func.name, isConnected: true }, [].slice.call(arguments));
      if (element != null && element.parentNode && !element.isEqualNode(updated)) {
        element.parentNode.replaceChild(updated, element);
        element = updated;
      }
    }, func.name);
    return Elements['n-connect']({ title: func.name }, element);
  }
}

function router(routes) {
  window.onhashchange = dispatch.bind(undefined, 'hashchange');
  return connect(function hashchange() {
    var path = window.location.hash.split('/');
    return path[1] && routes[path[1]] ? routes[path[1]].apply(undefined, path.slice(2)) : routes.index.apply(undefined, path.slice(2));
  })();
}

export default Elements;
export { store, watch, dispatch, connect, router };
