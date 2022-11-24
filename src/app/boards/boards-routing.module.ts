import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from './pages/boards/boards.component';
import { BoardComponent } from './pages/board/board.component';
import { BoardsHeaderComponent } from './components/boards-header/boards-header.component';

const routes: Routes = [
  {
    path: '',
    component: BoardsComponent,
  },
  {
    path: '',
    component: BoardsHeaderComponent,
    outlet: 'header',
  },
  {
    path: ':id',
    component: BoardComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class BoardsRoutingModule {}
