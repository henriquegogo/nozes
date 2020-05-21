(function(global) { global.Nozes = function() {
  var store = {}, listeners = [], styles = {}, merge = Object.assign;
  function is(something, constructor) { return something && something.constructor === constructor }

  'a abbr address area article aside audio b base bdi bdo blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd label legend li link main map mark math menu meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select slot small source span strong style sub summary sup svg table tbody td template textarea tfoot th thead time title tr track u ul var video wbr'.split(' ').forEach(function(tag) {
    createElement[tag] = createElement.bind(undefined, tag);
  });

  function createElement(type) {
    if (is(type, Object)) return createElement(type.tagName, (type.children || []).map(createElement), (delete type.tagName, delete type.children, type));
    else if (is(type, Function)) return type.apply(undefined, [].slice.call(arguments).slice(1));
    var el = type.trim()[0] === '<' ? new DOMParser().parseFromString(type, 'text/html').body.firstChild : document.createElement(type);
    [].slice.call(arguments).slice(1).forEach(function appendArgs(arg) {
      is(arg, Object) ? merge(el, arg) && is(arg.style || '', Object) && merge(el.style, arg.style) :
      is(arg, Function) ? arg(el) :
      is(arg, Array) ? arg.forEach(appendArgs) :
      is(arg, String) || is(arg, Number) ? el.appendChild(document.createTextNode(arg)) :
      arg && arg.constructor.name.includes('Element') && el.appendChild(arg);
    });
    return el;
  }

  function styleClass(def) {
    var name = 's'+Math.random().toString(36).substr(2);
    var nestedDef = def.replace(/[&@]/, '} $&').replace(/&/g, '.' + name).replace(/}\s*$/, '');
    !styles[def] && document.head.appendChild(createElement('style', '.' + (styles[def]=name) + ' {' + nestedDef + '}'));
    return styles[def];
  }
  
  function watch(event, func, group) {
    var found_event = listeners.find(function(listener) {
      return group !== undefined && listener.group === group && listener.event === event;
    });
    found_event ? merge(found_event, { action: func }) : listeners.push({ event: event, action: func, group: group });
  }
  
  function dispatch(event, msg) {
    is(event, String) && (msg = store[event] = is(msg, Object) ? merge({}, store[event], msg) : msg);
    listeners.forEach(function(listener) {
      if (listener.event === (event.name || event) || !listener.event) {
        listener.action(msg);
      }
    });
  }
  
  function connect(events, func) {
    is(events, Function) ? (func = events, events = []) : !Array.isArray(events) && (events = [events]);
    return function(props) {
      var el = document.createDocumentFragment();
      events.concat(func.name).forEach(function(event) {
        watch(event = event.name || event, function(new_props) {
          var updated = func.call({ isConnected: true }, props = merge({}, props, store, event === func.name && new_props));
          if (el != null && el.parentNode && updated instanceof Node && !el.isEqualNode(updated)) {
            el.parentNode.replaceChild(updated, el);
            el = updated;
          }
        }, func.name);
      });
      el = func.call({ isConnected: false }, props = merge({}, props, store));
      return createElement('span', el, function(span) { span.setAttribute('data-connect', func.name) });
    }
  }

  function router(routes) {
    window.onhashchange = dispatch.bind(undefined, { name: 'hashchange' });
    return connect(function hashchange() {
      var path = window.location.hash.split('/');
      return routes[path[1] = path[1] || 'index'] && routes[path[1]].apply(undefined, path.slice(2));
    })();
  }

  return { createElement: createElement, styleClass: styleClass, watch: watch, dispatch: dispatch, connect: connect, router: router };
}})(typeof module !== "undefined" ? module.exports : window);
