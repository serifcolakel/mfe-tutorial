import axios from 'axios';

const api = axios;

api.defaults.headers.post['Content-Type'] = 'application/json';
api.defaults.headers.Accept = 'application/json';
api.defaults.withCredentials = false;
api.defaults.timeout = 1000 * 60 * 2; // Two minutes

export { api };
