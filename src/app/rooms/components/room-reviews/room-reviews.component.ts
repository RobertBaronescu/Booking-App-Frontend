import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Review } from 'src/app/core/interfaces/review.interface';

@Component({
  selector: 'app-room-reviews',
  templateUrl: './room-reviews.component.html',
  styleUrls: ['./room-reviews.component.scss'],
})
export class RoomReviewsComponent implements OnInit {
  @Input() reviews!: Review[] | undefined;

  @Output() reviewAddEvent = new EventEmitter<Review>();

  stars = [1, 2, 3, 4, 5];

  constructor() {}

  ngOnInit(): void {}

  onReviewAdd(review: Review) {
    this.reviewAddEvent.emit(review);
  }
}
