import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from 'src/app/core/interfaces/review.interface';
import { User } from 'src/app/core/interfaces/user.interface';

import { AuthService } from 'src/app/core/services/auth.service';
import { ReviewServiceService } from 'src/app/core/services/review-service.service';
import { RoomService } from 'src/app/core/services/room.service';
import { UserService } from 'src/app/core/services/user.service';
import { RoomReviewStarsComponent } from '../room-review-stars/room-review-stars.component';

@Component({
  selector: 'app-room-add-review',
  templateUrl: './room-add-review.component.html',
  styleUrls: ['./room-add-review.component.scss'],
})
export class RoomAddReviewComponent implements OnInit {
  @ViewChild('reviewStars') reviewStarsComponent!: RoomReviewStarsComponent;

  @Output() addReviewEvent = new EventEmitter<Review>();

  characters: number = 1000;
  starRating!: number;

  decrementCharacters(event: any) {
    this.characters = 1000;
    const value = event.target.value;
    this.characters -= value.length;
  }

  onReviewStarHandle(starRating: number) {
    this.starRating = starRating;
  }

  postReview(text: string, event: any) {
    event.preventDefault();

    const user = this.userService.currentUser$.getValue();
    const locationId = String(this.route.snapshot.paramMap.get('id'));
    const roomId = String(this.route.snapshot.paramMap.get('roomId'));

    const newReview = {
      content: text,
      createdDate: Date.now(),
      rating: this.starRating,
      userId: String(user?._id),
      author: user?.name,
      avatar: user?.picture,
    };

    this.roomService.postReview(newReview, locationId, roomId).subscribe(() => {
      this.addReviewEvent.emit(newReview);
    });
  }

  constructor(
    private roomService: RoomService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}
}
