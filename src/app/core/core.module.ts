import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserTokenService } from './services/user-token.service';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule],
  providers: [UserTokenService],
})
export class CoreModule {}
