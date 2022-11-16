import { API_BOARDS, RoutePaths } from '../constants';

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
