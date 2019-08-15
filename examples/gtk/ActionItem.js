const { Elements, dispatch, connect } = imports.vendor['nozes-gtk'];
const { Button } = Elements;
const CENTER = 3;

function ActionItem(text) {
  return Button({
      label: text,
      visible: true,
      valign: CENTER,
      halign: CENTER
    },
    ref => ref.connect('clicked', () => dispatch('click', 'Clicked'))
  );
}
var ActionItem = connect('click', ActionItem);
