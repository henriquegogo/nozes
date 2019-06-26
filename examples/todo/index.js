import App from './App.js';

export const events = (function() {
  const container = document.createDocumentFragment();
  const listeners = {};
  return {
    on: function(name, callback) {
      function handler(e) { callback(e.detail) }
      container.removeEventListener(name, listeners[callback.toString()+name]);
      container.addEventListener(name, handler);
      listeners[callback.toString()+name] = handler;
    }, 
    off: container.removeEventListener,
    emit: function(name, data) { container.dispatchEvent(new CustomEvent(name, {detail: data})) }
  };
})();

export const store = { tasklist: [] };

document.body.appendChild(App());
