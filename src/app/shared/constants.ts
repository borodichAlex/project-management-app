export const SERVER_URL = 'http://localhost:4000';
export const MODAL_WIDTH = '300px';

export enum ENDPOINTS {
  signin = 'signin',
  signup = 'signup',
  users = 'users',
  boards = 'boards',
  columns = 'columns',
  tasks = 'tasks',
}

export enum RoutePaths {
  welcome = 'welcome',
  boards = 'boards',
  columns = 'columns',
  tasks = 'tasks',
  notfound = '404',
  authPrefix = 'auth/',
  login = 'login',
  signup = 'signup',
  userProfile = 'user-profile',
}

export const GATEWAY_TIMEOUT_ERROR = 504;
