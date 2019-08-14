#!/usr/bin/env gjs

imports.gi.versions.Gtk = '3.0';
const Gtk = imports.gi.Gtk;

Gtk.init(null);

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

/////////////////////////////////////////

const { Window, Button } = Elements;
const { CENTER } = Gtk.Align;

function App() {
  watch('quit', Gtk.main_quit);

  return (
    Window({
        title: 'Application Window',
        default_width: 300,
        default_height: 250,
        window_position: CENTER
      },
      Button({
          label: 'Click here',
          visible: true,
          valign: CENTER,
          halign: CENTER
        },
        ref => ref.connect('clicked', () => dispatch('quit'))
      )
    )
  );
}

App().show();

/////////////////////////////////////////

Gtk.main()
