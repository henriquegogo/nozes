import Nozes from '../../nozes.js';
const { div, h1, form, input, ul, li, button, b, span } = Nozes;

function InputForm(add) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { input_task } = e.target;
    add(input_task.value);
  };

  return form({ id: 'form_task', onsubmit: handleSubmit },
    input({
      id: 'input_task',
      placeholder: 'Type a task',
      style: 'width: 476px',
      autofocus: true
    })
  );
}

function Tasks(tasklist) {
  return ul(
    ...tasklist.map(text =>
      li(text)
    )
  );
}

function App(tasklist) {
  let app, tasks;
  tasklist = tasklist || [];

  const add = (text) => {
    tasklist.push(text);
    app.replaceWith(app=App(tasklist));
    app.children.form_task.input_task.focus();
  }

  const reverse = () => {
    tasks.replaceWith(tasks=Tasks(tasklist.reverse()));
  }

  return app=div(
    h1('Todo List'),
    InputForm(add),
    tasks=Tasks(tasklist),
    div(
      button({ style: 'float: right', onclick: reverse }, 'Reverse'),
      b('Total: '), span(tasklist.length)
    )
  );
}

document.body.appendChild(App());
