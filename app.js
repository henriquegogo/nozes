import Forro from './forro.js';
const { div, h1, form, input, ul, li, button, b, span } = Forro;

function InputForm(add) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { input_task } = e.target;
    add(input_task.value);
  };

  return form({ onsubmit: handleSubmit },
    input({
      name: 'input_task',
      placeholder: 'Type a task',
      style: 'width: 476px',
      autofocus: true,
    }),
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
    app.querySelector('[name=input_task]').focus();
  }

  const reverse = () => {
    tasks.replaceWith(tasks=Tasks(tasklist.reverse()));
  }

  return app = div(
    h1('Todo List'),
    InputForm(add, tasklist),
    tasks=Tasks(tasklist),
    div(
      button({ style: 'float: right', onclick: reverse }, 'Reverse'),
      b('Total: '), span(tasklist.length),
    ),
  );
}

document.body.append(App());
