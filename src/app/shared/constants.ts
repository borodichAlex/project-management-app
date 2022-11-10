export const SERVER_URL = 'localhost:4000';
export const API_BOARDS = 'api/boards';

export enum ENDPOINTS {
  signin = 'signin',
  signup = 'signup',
}

export enum RoutePaths {
  welcome = 'welcome',
  boards = 'boards',
  columns = 'columns',
  tasks = 'tasks',
  notfound = '404',
  login = 'login',
  signup = 'signup',
}

export function columnApi(boardId: string, columnId?: string): string {
  return columnId
    ? `${API_BOARDS}/${boardId}/${RoutePaths.columns}/${columnId}`
    : `${API_BOARDS}/${boardId}/${RoutePaths.columns}`;
}
