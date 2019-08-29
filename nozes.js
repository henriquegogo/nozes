var Elements = 'a abbr address area article aside b base bdi bdo blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param pre progress q rb rp rt rtc ruby s samp script section select small source span strong style sub summary sup table tbody td template textarea tfoot th thead time title tr track u ul video wbr'.split(' ').reduce(function(result, tag) {
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

function watch(events, func, key) {
  var listeners = watch.listeners = watch.listeners || [];
  var events_list = Array.isArray(events) ? events : events.split(' ');
  events_list.forEach(function(name) {
    var found_event = listeners.find(function(listener) { return key !== undefined && listener.key === key });
    if (found_event) {
      Object.assign(found_event, { event: name, action: func });
    } else {
      listeners.push({ event: name, action: func, key: key });
    }
  });
}

function dispatch(event, arg) {
  watch.listeners.forEach(function(listener) {
    (listener.event === event || !listener.event) && listener.action(arg, event);
  });
}

function store() {
  var msgs = store.msgs = store.msgs || {};
  watch('', function(msg, event) {
    msgs[event] = msgs[event] && msgs[event].constructor === Object ? Object.assign(msgs[event], msg) : msg;
  }, 'store_msgs');
  return msgs;
}

function connect(events, func) {
  return function() {
    var props = [].slice.call(arguments);
    var element = func.apply(undefined, props);
    watch(events, function() {
      var updated = func.apply(element, props);
      if (element != null && element.parentNode && !element.isEqualNode(updated)) {
        element.parentNode.replaceChild(updated, element);
        element = updated;
      }
    }, func.name ? 'connect_' + func.name : undefined);
    return element;
  }
}

function router(routes) {
  window.onhashchange = dispatch.bind(undefined, 'hashchange');
  return connect('hashchange', function() {
    var path = window.location.hash.split('/');
    return path[1] && routes[path[1]] ? routes[path[1]].apply(undefined, path.slice(2)) : routes.index.apply(undefined, path.slice(2));
  })();
}

export default Elements;
export { watch, dispatch, store, connect, router };
