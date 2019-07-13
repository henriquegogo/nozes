import { watch, dispatch } from '../../nozes.js';

function Router(routes) {
  const [ _, route, param ] = location.hash.split('/');
  return route && routes[route] ? routes[route](param) : routes.index(param);
}

window.onhashchange = dispatch.bind(null, 'route');

export default watch('route', Router);
