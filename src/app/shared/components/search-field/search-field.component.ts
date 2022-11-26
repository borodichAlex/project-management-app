import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
  ],
})
export class SearchFieldComponent implements OnInit, OnDestroy {
  @Output() public searchValueEvent: EventEmitter<string> =
    new EventEmitter<string>();

  @ViewChild('searchInput', {
    read: ElementRef,
  })
  private searchInputRef!: ElementRef;

  public searchControl: FormControl = new FormControl('');

  private subscription!: Subscription;

  public ngOnInit(): void {
    this.initSearchValueObserver();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onIconClick(): void {
    this.submitSearchValue(this.searchControl.value);
  }

  private submitSearchValue(value: string): void {
    this.searchValueEvent.emit(value);
    this.reset();
  }

  private reset(): void {
    this.searchControl.setValue('');
    this.searchInputRef.nativeElement.blur();
  }

  private initSearchValueObserver(): void {
    const DELAY_TIME: number = 2000;
    this.subscription = this.searchControl.valueChanges
      .pipe(debounceTime(DELAY_TIME))
      .subscribe((value: string) => {
        if (value) {
          this.submitSearchValue(value);
        }
      });
  }
}
