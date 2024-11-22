import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';
import { IData } from './types';

@Injectable({
  providedIn: 'root',
})
export class ErrorDialogService {
  constructor(public dialog: MatDialog) {}

  openDialog(data: IData): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '300px',
      data,
    });
  }
}
