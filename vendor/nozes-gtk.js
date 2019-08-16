imports.gi.versions.Gtk = '3.0';
const Gtk = imports.gi.Gtk;

var Elements = 'Window Dialog MessageDialog AboutDialog Assistant Invisible OffscreenWindow WindowGroup Box Grid Revealer ListBox FlowBox Stack StackSwitcher StackSidebar ActionBar HeaderBar Overlay ButtonBox Paned Layout Notebook Expander Orientable AspectFrame Fixed Label Image Spinner InfoBar ProgressBar LevelBar Statusbar AccelLabel Button CheckButton RadioButton ToggleButton LinkButton MenuButton Switch ScaleButton VolumeButton LockButton ModelButton Entry EntryBuffer EntryCompletion Scale SpinButton SearchEntry SearchBar Editable TextIter TextMark TextBuffer TextTag TextTagTable TextView TreeModel TreeSelection TreeViewColumn TreeView TreeView CellView IconView TreeSortable TreeModelSort TreeModelFilter CellLayout CellArea CellAreaBox CellAreaContext CellRenderer CellEditable CellRendererAccel CellRendererCombo CellRendererPixbuf CellRendererProgress CellRendererSpin CellRendererText CellRendererToggle CellRendererSpinner ListStore TreeStore ComboBox ComboBoxText Menu MenuBar MenuItem RadioMenuItem CheckMenuItem SeparatorMenuItem ToolShell Toolbar ToolItem ToolPalette ToolItemGroup SeparatorToolItem ToolButton MenuToolButton ToggleToolButton RadioToolButton Popover PopoverMenu ColorChooser ColorButton ColorChooserWidget ColorChooserDialog FileChooser FileChooserButton FileChooserNative FileChooserDialog FileChooserWidget FileFilter FontChooser FontButton FontChooserWidget FontChooserDialog PlacesSidebar Frame Separator Scrollbar ScrolledWindow Scrollable PrintOperation PrintContext PrintSettings PageSetup PaperSize Printer PrintJob PrintUnixDialog PageSetupUnixDialog Shortcuts ShortcutsWindow ShortcutsSection ShortcutsGroup ShortcutsShortcut Adjustment Calendar DrawingArea GLArea EventBox HandleBox IMContextSimple IMMulticontext SizeGroup Tooltip Viewport Accessible Widget Container Bin MenuShell Range IMContext NativeDialog Plug Socket RecentManager RecentChooser RecentChooserDialog RecentChooserMenu RecentChooserWidget RecentFilter AppChooser AppChooserButton AppChooserDialog AppChooserWidget EventController EventControllerKey EventControllerScroll EventControllerMotion Gesture GestureSingle GestureDrag GestureLongPress GestureMultiPress GesturePan GestureSwipe GestureRotate GestureZoom GestureStylus PadController'.split(' ').reduce(function(result, tag) {
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
