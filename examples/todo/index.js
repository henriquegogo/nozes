import { dispatch } from '../../nozes.js';
import App from './App.js';

document.body.appendChild(App());

dispatch('tasklist', [1, 2, 3]);
