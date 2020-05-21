import { createElement, dispatch } from '../../../index.js';

function Message(props, msg) {
  return <button onclick={() => dispatch('log', 'hello')}>{msg}</button>;
}

export default Message;
