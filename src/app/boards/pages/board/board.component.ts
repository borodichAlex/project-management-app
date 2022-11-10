import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ColumnsService } from '../../services/columns.service';
import { TColumn } from '../../interfaces/column.interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
  boardId: string = this.route.snapshot.params['id'];

  columns$!: Observable<TColumn[]>;

  isLoading$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private columnsService: ColumnsService,
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.columnsService.isLoading;
    this.columnsService.loadAll(this.boardId);
    this.columns$ = this.columnsService.columns;
  }
}
