imports.gi.versions.Gtk = '3.0';
const Gtk = imports.gi.Gtk;

var Elements = 'Window Button'.split(' ').reduce(function(result, tag) {
  result[tag] = function() {
    var element = new Gtk[tag];
    [].slice.call(arguments).filter(function(arg) { return arg != null }).forEach(function(arg) {
      arg.constructor === Object ? Object.assign(element, arg) :
      arg.constructor === Function ? arg(element) :
      arg.constructor === String || arg.constructor === Number ? element.label = arg :
      arg.constructor.name.includes('Gtk_') && element.add(arg);
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
      return result && result.constructor === Object ? Object.assign(result, store[event]) : store[event] || props[0];
    }, props[0]);

    var element = func.apply(undefined, props);
    watch(events, function(msg) {
      props[0] = props[0] && props[0].constructor === Object ? Object.assign(props[0], msg) : msg;
      var updated = func.apply(element, props);
      var parent = element.get_parent();
      if (element != null && parent != null) {
        parent.remove(element);
        parent.add(updated);
        element = updated;
      }
    }, func.name ? 'connect_' + func.name : undefined);
    return element;
  }
}
