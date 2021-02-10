import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Review } from 'src/app/core/interfaces/review.interface';
import { User } from 'src/app/core/interfaces/user.interface';

import { AuthService } from 'src/app/core/services/auth.service';
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
  reviewDescriptionForm = new FormGroup({
    description: new FormControl('', Validators.required),
    rating: new FormControl('', Validators.required),
  });

  decrementCharacters(event: any) {
    this.characters = 1000;
    const value = event.target.value;
    this.characters -= value.length;
  }

  onReviewStarHandle(starRating: number) {
    this.reviewDescriptionForm.get('rating')?.patchValue(starRating);
    this.starRating = 0;
  }

  formSubmit() {
    const user = this.userService.currentUser$.getValue();
    const locationId = String(this.route.snapshot.paramMap.get('id'));
    const roomId = String(this.route.snapshot.paramMap.get('roomId'));
    const newReview = {
      content: this.reviewDescriptionForm.get('description')?.value,
      createdDate: Date.now(),
      rating: this.reviewDescriptionForm.get('rating')?.value,
      userId: String(user?._id),
      author: user?.name,
      avatar: user?.picture,
    };

    this.addReviewEvent.emit(newReview);
    this.roomService.postReview(newReview, locationId, roomId).subscribe();
    this.reviewDescriptionForm.reset();
    this.reviewDescriptionForm.get('rating')?.patchValue(this.starRating);
    this.reviewStarsComponent.resetStars();
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
