import Elements from '../../nozes.js';

Elements.createElement = function createElement() {
  var props = [].slice.call(arguments);
  var tag = props.shift();
  if (tag.constructor == Function) {
    props = props.filter(function(i) { return i !== null });
    return tag.apply(undefined, props);
  }
  else {
    return this[tag].apply(undefined, props);
  }
}

export default Elements;
