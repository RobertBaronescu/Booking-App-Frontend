import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';


@Component({
  selector: 'app-room-review-stars',
  templateUrl: './room-review-stars.component.html',
  styleUrls: ['./room-review-stars.component.scss'],
})
export class RoomReviewStarsComponent implements OnInit {
  @ViewChild('container') container!: ElementRef;

  @Output() onStarsSelect: EventEmitter<number> = new EventEmitter<number>();

  stars = [1, 2, 3, 4, 5];

  constructor() {}

  onStarInteract(starRating: number) {
    Array.from(this.container.nativeElement.children).forEach(
      (starElement: any) => {
        const currentRating = Number(starElement.getAttribute('data-star'));

        starElement.classList.remove('text-warning');
        starElement.classList.add('text-gray');

        if (currentRating <= starRating) {
          starElement.classList.remove('text-gray');
          starElement.classList.add('text-warning');
        }
      }
    );
    this.onStarsSelect.emit(starRating);
  }

  resetStars() {
    Array.from(this.container.nativeElement.children).forEach((star: any) => {
      star.classList.remove('text-warning');
      star.classList.add('text-gray');
    });
  }

  ngOnInit(): void {}
}
