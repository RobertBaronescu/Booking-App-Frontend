import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss'],
})
export class StarsComponent implements OnInit {
  @Input() set rating(value: number | undefined) {
    if (value) {
      this.calculateStarRating(value);
    }
  }

  starWidth: any;

  constructor() {}

  ngOnInit(): void {}

  calculateStarRating(rating: number) {
    const starPercentage = (rating / 5) * 100;
    this.starWidth = `${Math.round(starPercentage / 10) * 10}%`;
  }
}
