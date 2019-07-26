import Elements from '../../../nozes.js';

function createElement(tag, ...props) {
  return tag.constructor == Function ? tag(...props.filter(i => i !== null)) : Elements[tag](...props);
}

export default createElement;
