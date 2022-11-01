import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsComponent } from './boards.component';
import { NgxTranslateModule } from '../translate/translate.module';

@NgModule({
  declarations: [BoardsComponent],
  imports: [CommonModule, BoardsRoutingModule, NgxTranslateModule],
})
export class BoardsModule {}
