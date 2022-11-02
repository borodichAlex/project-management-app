import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggingService } from './services/logging.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule],
  providers: [LoggingService],
})
export class CoreModule {}
