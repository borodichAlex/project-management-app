export const SERVER_URL = 'http://localhost:4000';
export const API_BOARDS = 'api/boards';
export const MODAL_WIDTH = '300px';

export enum ENDPOINTS {
  signin = 'signin',
  signup = 'signup',
  users = 'users',
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

export function columnApi(boardId: string, columnId?: string): string {
  return columnId
    ? `${API_BOARDS}/${boardId}/${RoutePaths.columns}/${columnId}`
    : `${API_BOARDS}/${boardId}/${RoutePaths.columns}`;
}

export function taskApi(
  boardId: string,
  columnId: string,
  taskId?: string,
): string {
  return taskId
    ? `${columnApi(boardId, columnId)}/tasks/${taskId}`
    : `${columnApi(boardId, columnId)}/tasks`;
}
