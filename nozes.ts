((global: any) => { 
  type Listener = {
    event: string,
    action: Function,
    group: string
  };

  global.Nozes = function(): any {
    const store: Record<string, unknown> = {},
      listeners: Listener[] = [],
      styles: Record<string, unknown> = {};

    const htmlTags: string[] = ('a abbr address area article aside audio b base bdi bdo '
      + 'blockquote body br button canvas caption cite code col colgroup data '
      + 'datalist dd del details dfn dialog div dl dt em embed fieldset '
      + 'figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr '
      + 'html i iframe img input ins kbd label legend li link main map mark '
      + 'math menu meta meter nav noscript object ol optgroup option output p '
      + 'param picture pre progress q rp rt ruby s samp script section select '
      + 'slot small source span strong style sub summary sup svg table tbody '
      + 'td template textarea tfoot th thead time title tr track u ul var '
      + 'video wbr').split(' ');

    htmlTags.forEach((tag: string) => {
      createElement[tag] = createElement.bind(undefined, tag);
    });

    function createElement(func: Function, ...argsList: any[]): HTMLElement;

    function createElement(prop: string, ...argsList: any[]): HTMLElement;

    function createElement(prop: any, ...argsList: any[]): HTMLElement {
      const element = document.createElement(prop);

      function appendArgs(arg: Function | HTMLElement | string | any[] | any) {
        if (!arg) {
          return;
        }

        if (arg.constructor === Object) {
          Object.assign(element, arg);

          if (arg.style && arg.style.constructor === Object) {
            Object.assign(element.style, arg.style)
          }
        } else if (arg.constructor === Function) {
          arg(element);
        } else if (arg.constructor === Array) {
          arg.forEach(appendArgs);
        } else if (arg.constructor === String || arg.constructor === Number) {
          const textNode = document.createTextNode(arg as string);
          element.appendChild(textNode);
        } else if (arg.constructor.name.includes('Element')) {
          element.appendChild(arg);
        }
      }
      argsList.forEach(appendArgs);

      return element;
    }

    function styleClass(def: string): unknown {
      const name = 's' + Math.random().toString(36).substr(2);
      const nestedDef = def
        .replace(/[&@]/, '} $&')
        .replace(/&/g, '.' + name)
        .replace(/}\s*$/, '');

      if (!styles[def]) {
        const styleString = '.' + (styles[def]=name) + ' {' + nestedDef + '}';
        const styleElement = createElement('style', styleString);

        document.head.appendChild(styleElement);
      }

      return styles[def];
    }

    function watch(event: string, func: Function, group: string): void {
      const foundEvent = listeners.find(listener => group !== undefined
        && listener.group === group && listener.event === event);

      if (foundEvent) {
        Object.assign(foundEvent, { action: func });
      } else {
        listeners.push({ event: event, action: func, group: group });
      }
    }

    function dispatch(event: string, msg: any, persist: boolean): void;

    function dispatch(event: Function, msg: any, persist: boolean): void;

    function dispatch(event: any, msg: any, persist: boolean = true): void {
      if (event.constructor === String && persist !== false) {
        if (msg !== undefined && msg.constructor === Object) {
          msg = Object.assign({}, store[event as string], msg);
        }

        store[event as string] = msg;
      }

      listeners.forEach((listener: Listener) => {
        if (!listener.event
          || listener.event === event
          || listener.event === event.name) {
          setTimeout(function() { listener.action(msg) });
        }
      });
    }

    function connect(events: string, func: Function): Function;

    function connect(events: Function, func: undefined): Function;

    function connect(events: any | any[], func: Function | undefined): Function {
      if (events.constructor === Function) {
        func = events;
        events = func.name ? new Array(func.name) : new Array();
      } else if (!Array.isArray(events)) {
        events = func.name ? new Array(events, func.name) : new Array(events);
      } else if (func.name) {
        events = events.concat(func.name);
      }

      return (props: Record<string, unknown>) => {
        let element = document.createDocumentFragment() as Node;

        events.forEach((event: any) => {
          if (event.name) {
            event = event.name;
          }

          watch(event, (newProps: Record<string, unknown>) => {
            if (event !== func.name) {
              newProps = {};
            }

            props = Object.assign({}, props, store, newProps);
            const updated = func.call(element, props);

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

    function router(routes: Record<string, HTMLElement>[], func: Function = function() {}): Function {
      function hashchange() {
        func && func(window.location.hash);
        const path = window.location.hash.substr(1).split('/').filter(encodeURI);

        for (const routePath of Object.keys(routes)) {
          const route = routePath.split('/').filter(encodeURI);
          const matchRoutePath = route.every(function(item, i) {
            return path[i] == item || item[0] == '{';
          });

          if (path.length == route.length && matchRoutePath) {
            const params = path.filter(function(_, i) { return route[i][0] == '{' });
            return routes[routePath].apply(undefined, params);
          };
        }

        return routes['index'] && routes['index'].apply(undefined);
      }

      window.onhashchange = dispatch.bind(undefined, hashchange);

      return connect(hashchange, undefined)();
    }

    return {
      createElement: createElement,
      styleClass: styleClass,
      watch: watch,
      dispatch: dispatch,
      connect: connect,
      router: router
    };
  }
})(typeof module !== 'undefined' ? module.exports : window);
