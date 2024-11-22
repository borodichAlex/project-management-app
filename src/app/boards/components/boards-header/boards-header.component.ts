import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { RoutePaths } from 'src/app/shared/constants';
import { BoardsService } from '../../services/boards.service';

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

  public showBigButtons = new BehaviorSubject<boolean>(false);

  private subscription!: Subscription;

  constructor(
    private router: Router,
    private boardsService: BoardsService,
    public breakpointObserver: BreakpointObserver,
  ) {}

  public ngOnInit(): void {
    this.setCurrentPageState(this.router.routerState.snapshot.url);
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setCurrentPageState(event.url);
      }
    });
    this.breakpointObserver
      .observe(['(min-width: 769px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.showBigButtons.next(true);
        } else {
          this.showBigButtons.next(false);
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

  private setCurrentPageState(url: string): void {
    const URLArr = url.split('/');
    const posParentPage =
      URLArr.findIndex((part) => part === RoutePaths.boards) + 1;

    if (posParentPage) {
      this.isParentPage.next(URLArr.length === posParentPage);
    }
  }
}
