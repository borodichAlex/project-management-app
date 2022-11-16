import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsModalComponent } from './boards-modal.component';

describe('CreateBoardComponent', () => {
  let component: BoardsModalComponent;
  let fixture: ComponentFixture<BoardsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardsModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
