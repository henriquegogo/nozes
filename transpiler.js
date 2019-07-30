function transpile(element, depth) {
  var tagName = element.tagName;
  var identation = Array(depth = depth || 0).join('  ');

  if (!tagName) return identation + '"' + element.textContent + '"';

  var attributes = {};
  for (var i = 0; i < element.attributes.length; i++) {
    var attr = element.attributes[i];
    attributes[attr.name] = attr.value;
  }

  var children = [];
  for (var i = 0; i < element.childNodes.length; i++) {
    var child = element.childNodes[i];
    child.tagName !== 'SCRIPT' && children.push(transpile(child, depth + 1));
  }

  return identation + tagName.toLowerCase()
    .concat('(')
    .concat(Object.keys(attributes).length ? JSON.stringify(attributes) : '')
    .concat(Object.keys(attributes).length && children.length ? ',' : '')
    .concat(children.length ? '\n' : '')
    .concat(children.join(', \n'))
    .concat(children.length ? '\n' : '')
    .concat(identation + ')');
}
