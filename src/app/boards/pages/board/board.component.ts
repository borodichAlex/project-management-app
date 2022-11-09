import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
  id: string = this.route.snapshot.params['id'];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // eslint-disable-next-line no-console
    console.log('board id:', this.id);
  }
}
