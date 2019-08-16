const { Elements, watch, dispatch, connect } = imports.vendor['nozes-gtk'];
const { Window, Button } = Elements;
const ActionItem = imports.ActionItem.ActionItem;

function App() {
  return (
    Window({
        title: 'Application Window',
        default_width: 300,
        default_height: 250
      },
      ActionItem('Click here')
    )
  );
}
