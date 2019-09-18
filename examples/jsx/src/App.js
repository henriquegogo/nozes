import Message from './Message.js';
const { h2 } = Nozes;

function App() {
  return (
    <div>
      <h1>Hello, world</h1>
      {h2('You can use declarative elements mixed')}
      <Message>Lorem ipsum sicut dixit</Message>
    </div>
  );
}

export default App;
