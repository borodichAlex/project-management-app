import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { DialogData } from 'src/app/shared/components/confirmation/confirmation.component';
import { RoutePaths } from 'src/app/shared/constants';
import { SearchResultComponent } from '../../modals/search-result/search-result.component';
import { BoardsService } from '../../services/boards.service';
import {
  ISearchTask,
  SearchTaskService,
} from '../../services/search-task.service';

@Component({
  selector: 'app-boards-header',
  templateUrl: './boards-header.component.html',
  styleUrls: ['./boards-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsHeaderComponent implements OnInit, OnDestroy {
  public isParentPage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true,
  );

  private subscription!: Subscription;

  constructor(
    private router: Router,
    private boardsService: BoardsService,
    private searchTaskService: SearchTaskService,
    private matDialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.setCurrentPageState(this.router.routerState.snapshot.url);
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setCurrentPageState(event.url);
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onClickCreateBoard() {
    this.boardsService.createNewBoard();
  }

  public onClickBackToTheBoards() {
    this.router.navigateByUrl(RoutePaths.boards);
  }

  // eslint-disable-next-line class-methods-use-this
  public searchTaskByValue(value: string) {
    const findedTasks = this.searchTaskService.searchTask(value);
    if (findedTasks.length) {
      this.openSearchResults(findedTasks);
    }
  }

  private openSearchResults(findedTasks: ISearchTask[]): void {
    const modalConfig: DialogData = {
      title: 'title',
      description: 'description',
      findedTasks,
    };
    this.openModalWindow(modalConfig).subscribe(() => {
      // if (newBoard) {
      //   this.boardsService.update(id, newBoard, boardIndex);
      // }
    });
  }

  private openModalWindow(data: DialogData): Observable<boolean> {
    const dialogRef = this.matDialog.open(SearchResultComponent, {
      // width: 800,
      data,
    });

    return dialogRef.afterClosed();
  }

  private setCurrentPageState(url: string): void {
    const URLArr = url.split('/');
    const posParentPage =
      URLArr.findIndex((part) => part === RoutePaths.boards) + 1;

    if (posParentPage) {
      this.isParentPage.next(URLArr.length === posParentPage);
    }
  }
}
