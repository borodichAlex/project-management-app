import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoardsService } from '../../services/boards.service';
import { IBoard } from '../../interfaces/boards.interface';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsComponent implements OnInit {
  boards$: BehaviorSubject<IBoard[]> = this.boardsService.boardsSubject$;

  isLoading$: BehaviorSubject<boolean> = this.boardsService.isLoading$;

  constructor(private boardsService: BoardsService) {}

  ngOnInit(): void {
    this.boardsService.getBoards();
  }

  onClickDeleteBoard(id: string) {
    this.boardsService.deleteBoard(id);
  }

  onClickCreateBoard() {
    this.boardsService.createBoard();
  }

  onClickUpdateBoard(id: string) {
    this.boardsService.updateBoard(id);
  }
}
