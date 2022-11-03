import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UsertokenService } from './services/usertoken.service';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule],
  providers: [UsertokenService],
})
export class CoreModule {}
