import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Review } from 'src/app/core/interfaces/review.interface';

import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-room-reviews',
  templateUrl: './room-reviews.component.html',
  styleUrls: ['./room-reviews.component.scss'],
})
export class RoomReviewsComponent implements OnInit {
  @Input() reviews!: Review[] | undefined;

  @Output() reviewAddEvent = new EventEmitter<Review>();

  stars = [1, 2, 3, 4, 5];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onReviewAdd(review: Review) {
    this.reviewAddEvent.emit(review);
  }
}
