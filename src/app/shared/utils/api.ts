import { ENDPOINTS, SERVER_URL } from '../constants';

export function columnApi(boardId: string, columnId?: string): string {
  return columnId
    ? `${SERVER_URL}/${ENDPOINTS.boards}/${boardId}/${ENDPOINTS.columns}/${columnId}`
    : `${SERVER_URL}/${ENDPOINTS.boards}/${boardId}/${ENDPOINTS.columns}`;
}

export function taskApi(
  boardId: string,
  columnId: string,
  taskId?: string,
): string {
  return taskId
    ? `${columnApi(boardId, columnId)}/${ENDPOINTS.tasks}/${taskId}`
    : `${columnApi(boardId, columnId)}/${ENDPOINTS.tasks}`;
}
