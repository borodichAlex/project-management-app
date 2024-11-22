import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLinkWithHref } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsComponent } from './pages/boards/boards.component';
import { BoardComponent } from './pages/board/board.component';
import { ColumnsService } from './services/columns.service';
import { ApiColumnsService } from './services/api-columns.service';
import { ColumnComponent } from './components/column/column.component';
import { SortByOrderPipe } from '../shared/pipes/sort-by-order.pipe';
import { SortTasksByOrderPipe } from '../shared/pipes/sort-tasks-by-order.pipe';
import { TaskComponent } from './components/task/task.component';
import { ApiTasksService } from './services/api-tasks.service';
import { TasksService } from './services/tasks.service';
import { BoardsHeaderComponent } from './components/boards-header/boards-header.component';
import { BoardsService } from './services/boards.service';
import { ApiBoardsService } from './services/api-boards.service';

@NgModule({
  declarations: [
    BoardsComponent,
    BoardComponent,
    ColumnComponent,
    SortByOrderPipe,
    SortTasksByOrderPipe,
    TaskComponent,
    BoardsHeaderComponent,
  ],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTooltipModule,
    MatIconModule,
    TranslateModule,
    RouterLinkWithHref,
    DragDropModule,
  ],
  providers: [
    BoardsService,
    ApiBoardsService,
    ApiColumnsService,
    ColumnsService,
    ApiTasksService,
    TasksService,
  ],
})
export class BoardsModule {}
