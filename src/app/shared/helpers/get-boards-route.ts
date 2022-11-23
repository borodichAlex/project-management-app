import { RoutePaths } from '../constants';
import { BoardsRoute } from '../../core/interfaces/types';

export function getBoardsRoute(url: string): BoardsRoute | null {
  if (!url.includes(RoutePaths.boards)) {
    return null;
  }
  const routeValues: string[] = url
    .split('/')
    .filter((item) => item.length > 0);

  return routeValues.length === 1 ? 'boards' : 'boardsChildren';
}
