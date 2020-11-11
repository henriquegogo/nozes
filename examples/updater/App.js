// App.js
const { createElement, watch, dispatch, update } = new window.Nozes();
const { div, h1, p, button } = createElement;

function App(props) {
  const { title, desc } = props;
  const setTitle = title => dispatch(App, { title });

  function setState(state) {
    update(App, props, state);
  }

  if (this == window) {
    watch(App, setState);
    setTimeout(() => setTitle('New title'), 1000);
  }

  return props.element = div(
    h1(title),
    p(desc),
    button('Update', { onclick: () => setState({ title: 'Time is: ' + Date.now()}) })
  );
}

document.body.appendChild(App({ title: 'Hello, world', desc: 'My name is Gogs' }));
