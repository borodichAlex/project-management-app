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
import { BoardsService } from './services/boards.service';
import { ApiBoardsService } from './services/api-boards.service';
import { BoardComponent } from './pages/board/board.component';
import { ColumnsService } from './services/columns.service';
import { ApiColumnsService } from './services/api-columns.service';
import { ColumnComponent } from './components/column/column.component';

@NgModule({
  declarations: [BoardsComponent, BoardComponent, ColumnComponent],
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
    ApiBoardsService,
    BoardsService,
    ApiColumnsService,
    ColumnsService,
  ],
})
export class BoardsModule {}
