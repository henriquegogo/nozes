#!/usr/bin/env gjs

imports.searchPath.push('.', '../../');
imports.gi.versions.Gtk = '3.0';
const Gtk = imports.gi.Gtk;
const App = imports.App.App;

Gtk.init(null);

App().show();

Gtk.main()
