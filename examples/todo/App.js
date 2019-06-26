import Nozes from '../../nozes.js';

import InputForm from './InputForm.js';
import Tasks from './Tasks.js';
import Footer from './Footer.js';

const { div, h1 } = Nozes;

function App(tasklist) {
  let app, tasks;
  tasklist = tasklist || [];

  const add = (text) => {
    tasklist.push(text);
    app.replaceWith(app=App(tasklist));
    app.children.form_task.input_task.focus();
  }

  const remove = (i) => {
    tasklist.splice(i,1);
    app.replaceWith(app=App(tasklist));
  }

  const invert = () => {
    tasks.replaceWith(tasks=Tasks(tasklist.reverse()));
  }

  tasklist.remove = remove;
  tasklist.invert = invert;

  return app=div(
    h1('Todo List'),
    InputForm(add),
    tasks=Tasks(tasklist),
    Footer(tasklist)
  );
}

document.body.appendChild(App());
