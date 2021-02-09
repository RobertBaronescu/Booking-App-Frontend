import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculate-room-rating',
  templateUrl: './calculate-room-rating.component.html',
  styleUrls: ['./calculate-room-rating.component.scss'],
})
export class CalculateRoomRatingComponent implements OnInit {
  starWidth: any;

  constructor() {}

  ngOnInit(): void {}

  calculateStarRating(rating: number) {
    const starPercentage = (rating / 5) * 100;
    this.starWidth = `${Math.round(starPercentage / 10) * 10}%`;
  }
}
