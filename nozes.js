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
  watch.listeners = watch.listeners && watch.listeners.filter(function(listener) {
    return key === undefined || listener.key !== key;
  }) || [];
  events.split(' ').forEach(function(name) {
    watch.listeners.push({ event: name, action: func, key: key });
  });
}

function dispatch(events, arg) {
  var events_list = events.split(' ');
  watch.listeners.forEach(function(listener) {
    (events_list.includes(listener.event) || !listener.event) && listener.action(arg, events_list);
  });
}

function connect(events, func) {
  var events_list = events.split(' ');
  var store = connect.store = connect.store || {};

  watch('', function(msg, events_dispatched) {
    events_dispatched.forEach(function(event) {
      store[event] = store[event] && store[event].constructor === Object ? Object.assign(store[event], msg) : msg;
    });
  }, 'connectstore');
  
  return function() {
    var props = [].slice.call(arguments);
    props[0] = events_list.reduce(function(result, event) {
      return result && result.constructor === Object ? Object.assign(result, store[event]) : store[event];
    }, props[0]);

    var element = func.apply(undefined, props);
    watch(events, function(msg) {
      props[0] = props[0] && props[0].constructor === Object ? Object.assign(props[0], msg) : msg;
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
export { watch, dispatch, connect, router };
