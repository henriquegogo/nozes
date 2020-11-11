// App.js
const { createElement, watch, dispatch, update } = new window.Nozes();
const { div, h1, p } = createElement;

window.watch = watch;
window.dispatch = dispatch;

function App(props) {
  const { title, desc } = props;

  if (this == window) {
    watch('title', newTitle => update(App, props, { title: newTitle }));

    setTimeout(() => {
      dispatch('title', Date.now());
    }, 1000);
  }

  return props.element = div(
    h1(title),
    p(desc)
  );
}

document.body.appendChild(App({ title: 'Hello, world', desc: 'My name is Gogs' }));
