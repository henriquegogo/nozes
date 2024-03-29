(function(global) { 
  global.Nozes = function() {
    var store = {},
      listeners = [],
      styles = {};

    var htmlTags = ('a abbr address area article aside audio b base bdi bdo '
      + 'blockquote body br button canvas caption cite code col colgroup data '
      + 'datalist dd del details dfn dialog div dl dt em embed fieldset '
      + 'figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr '
      + 'html i iframe img input ins kbd label legend li link main map mark '
      + 'math menu meta meter nav noscript object ol optgroup option output p '
      + 'param picture pre progress q rp rt ruby s samp script section select '
      + 'slot small source span strong style sub summary sup svg table tbody '
      + 'td template textarea tfoot th thead time title tr track u ul var '
      + 'video wbr').split(' ');

    htmlTags.forEach(function(tag) {
      createElement[tag] = createElement.bind(undefined, tag);
    });

    function createElement(prop) {
      var argsList = [].slice.call(arguments).slice(1);

      if (prop.constructor === Function) {
        return prop.apply(undefined, argsList);
      }

      var element = document.createElement(prop);

      function appendArgs(arg) {
        if (!arg) { return }

        if (arg.constructor === Object) {
          Object.assign(element, arg);

          if (arg.style && arg.style.constructor === Object) {
            Object.assign(element.style, arg.style);
          }
        } else if (arg.constructor === Function) {
          arg(element);
        } else if (arg.constructor === Array) {
          arg.forEach(appendArgs);
        } else if (arg.constructor === String || arg.constructor === Number) {
          var textNode = document.createTextNode(arg);
          element.appendChild(textNode);
        } else if (arg.constructor.name.includes('Element')) {
          element.appendChild(arg);
        }
      }
      argsList.forEach(appendArgs);

      return element;
    }

    function styleClass(def) {
      var name = 's' + Math.random().toString(36).substr(2);
      var nestedDef = def
        .replace(/[&@]/, '} $&')
        .replace(/&/g, '.' + name)
        .replace(/}\s*$/, '');

      if (!styles[def]) {
        var styleString = '.' + (styles[def] = name) + ' {' + nestedDef + '}';
        var styleElement = createElement('style', styleString);

        document.head.appendChild(styleElement);
      }

      return styles[def];
    }

    function watch(event, func, group) {
      var foundEvent = listeners.find(function(listener) {
        return group !== undefined
          && listener.group === group
          && listener.event === event;
      });

      if (foundEvent) {
        Object.assign(foundEvent, { action: func });
      } else {
        listeners.push({ event: event, action: func, group: group });
      }
    }

    function dispatch(event, msg, persist) {
      if (event.constructor === String && persist !== false) {
        if (msg !== undefined && msg.constructor === Object) {
          msg = Object.assign({}, store[event], msg);
        }

        store[event] = msg;
      }

      listeners.forEach(function(listener) {
        if (!listener.event
          || listener.event === event
          || listener.event === event.name) {
          setTimeout(function() { listener.action(msg) });
        }
      });
    }

    function connect(events, func) {
      if (events.constructor === Function) {
        func = events;
        events = func.name ? new Array(func.name) : new Array();
      } else if (!Array.isArray(events)) {
        events = func.name ? new Array(events, func.name) : new Array(events);
      } else if (func.name) {
        events = events.concat(func.name);
      }

      return function(props) {
        var element = document.createDocumentFragment();

        events.forEach(function(event) {
          if (event.name) {
            event = event.name;
          }

          watch(event, function(newProps) {
            if (event !== func.name) {
              newProps = {};
            }

            props = Object.assign({}, props, store, newProps);
            var updated = func.call(element, props);

            if (element != null
              && element.parentNode
              && updated instanceof Node
              && !element.isEqualNode(updated)) {
              element.parentNode.replaceChild(updated, element);
              element = updated;
            }
          }, func.name);
        });

        props = Object.assign({}, props, store);
        element = func.call(window, props);

        return createElement((func.name || 'connected') + '-component', element);
      }
    }

    function router(routes, func) {
      function hashchange() {
        func && func(window.location.hash);
        var path = window.location.hash.substr(1).split('/').filter(encodeURI);

        for (var routePath of Object.keys(routes)) {
          var route = routePath.split('/').filter(encodeURI);
          var matchRoutePath = route.every(function(item, i) {
            return path[i] == item || item[0] == '{';
          });

          if (path.length == route.length && matchRoutePath) {
            var params = path.filter(function(_, i) { return route[i][0] == '{' });
            return routes[routePath].apply(undefined, params);
          }
        }

        return routes['index'] && routes['index'].apply(undefined);
      }

      window.onhashchange = dispatch.bind(undefined, hashchange);

      return connect(hashchange)();
    }

    return {
      createElement: createElement,
      styleClass: styleClass,
      watch: watch,
      dispatch: dispatch,
      connect: connect,
      router: router
    };
  };
})(typeof module !== 'undefined' ? module.exports : window);
