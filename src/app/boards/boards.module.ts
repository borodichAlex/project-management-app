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
import { MatDialogModule } from '@angular/material/dialog';
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
import { SearchFieldComponent } from '../shared/components/search-field/search-field.component';
import { SearchTaskService } from './services/search-task.service';
import { SearchResultComponent } from './modals/search-result/search-result.component';
import { SearchTaskComponent } from './modals/search-result/search-task/search-task.component';

@NgModule({
  declarations: [
    BoardsComponent,
    BoardComponent,
    ColumnComponent,
    SortByOrderPipe,
    SortTasksByOrderPipe,
    TaskComponent,
    BoardsHeaderComponent,
    SearchResultComponent,
    SearchTaskComponent,
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
    SearchFieldComponent,
    MatDialogModule,
  ],
  providers: [
    BoardsService,
    ApiBoardsService,
    ApiColumnsService,
    ColumnsService,
    ApiTasksService,
    TasksService,
    SearchTaskService,
  ],
})
export class BoardsModule {}
