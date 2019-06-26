import App from './App.js';

const container = document.createDocumentFragment();
const listeners = {};

export function when(events, element, func) {
  events.split(' ').forEach(name => container.addEventListener(name, () => element.replaceWith(element=func())));
  return element;
}

export function dispatch(name, data) {
  container.dispatchEvent(new CustomEvent(name));
}

export const store = { tasklist: [] };

document.body.appendChild(App());
