// App.js
import Elements from '../../nozes.js';
const React = { createElement: (tag, ...args) => Elements[tag](...args) };

function App() {
  return (
    <div>
      <h1>Hello, world</h1>
      <p>Lorem ipsum sicut dixit</p>
    </div>
  );
}

document.body.appendChild(App());
