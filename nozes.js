(function(global) { global.Nozes = function() {
  var store = {}, listeners = [];

  'a abbr address area article aside audio b base bdi bdo blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd label legend li link main map mark math menu meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select slot small source span strong style sub summary sup svg table tbody td template textarea tfoot th thead time title tr track u ul var video wbr'.split(' ').forEach(function(tag) {
    createElement[tag] = createElement.bind(undefined, tag);
  });

  function createElement(type) {
    if (type.constructor === Object) return createElement(type.tagName, (type.children || []).map(createElement), (delete type.tagName, delete type.children, type));
    else if (type.constructor === Function) return type.apply(undefined, [].slice.call(arguments).slice(1));
    var element = type.trim()[0] === '<' ? new DOMParser().parseFromString(type, 'text/html').body.firstChild : document.createElement(type);
    [].slice.call(arguments).slice(1).forEach(function appendArgs(arg) {
      arg == null || arg.constructor === Object ? Object.assign(element, arg) :
      arg.constructor === Function ? arg(element) :
      arg.constructor === Array ? arg.forEach(appendArgs) :
      arg.constructor === String || arg.constructor === Number ? element.appendChild(document.createTextNode(arg)) :
      arg.constructor.name.includes('Element') && element.appendChild(arg);
    });
    return element;
  };
  
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
      return createElement('span', element, function(span) { span.setAttribute('data-connect', func.name) });
    }
  }

  function router(routes) {
    window.onhashchange = dispatch.bind(undefined, { name: 'hashchange' });
    return connect(function hashchange() {
      var path = window.location.hash.split('/');
      return routes[path[1] = path[1] || 'index'] && routes[path[1]].apply(undefined, path.slice(2));
    })();
  }

  return { createElement: createElement, watch: watch, dispatch: dispatch, connect: connect, router: router };
}})(typeof module !== "undefined" ? module.exports : window);
