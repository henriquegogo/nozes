import { createElement, watch } from '../../../index.js';
import Message from './Message.js';
const { h2 } = createElement;

function App() {
  watch('log', console.log);

  return (
    <div>
      <h1>Hello, world</h1>
      {h2('You can use declarative elements mixed')}
      <Message>Lorem ipsum sicut dixit</Message>
    </div>
  );
}

document.body.appendChild(App());
