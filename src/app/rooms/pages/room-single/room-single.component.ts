import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/core/interfaces/review.interface';
import { Room } from 'src/app/core/interfaces/room.interface';
import { LocationService } from 'src/app/core/services/location.service';
import { RoomService } from 'src/app/core/services/room.service';

@Component({
  selector: 'app-room-single',
  templateUrl: './room-single.component.html',
  styleUrls: ['./room-single.component.scss'],
})
export class RoomSingleComponent implements OnInit {
  room!: Room;
  firstPhoto!: string;
  photos!: string[];
  amenities: any = [];
  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('roomId');
    this.roomService.getRoom(String(id)).subscribe((room) => {
      this.room = room;
      this.firstPhoto = room.photos[0];
      this.photos = room.photos.slice(1);

      this.roomService.amenities?.forEach((amenity) => {
        if (room.amenities!.some((e) => e === amenity.name)) {
          this.amenities?.push(amenity);
        }
      });
   
    });
  }

  calculateAverageRating(): number {
    const ratings = this.room.reviews.map(({ rating }) => Number(rating));
    const ratingsSum = ratings.reduce((acc, current) => acc + current, 0);

    return Number((ratingsSum / ratings.length).toFixed(2));
  }

  onReviewAdd(review: Review) {
    const id = this.route.snapshot.paramMap.get('roomId');
    this.roomService.postReview(review, String(id)).subscribe(() => {
      this.room.reviews.push(review);
      const updatedRating = this.calculateAverageRating();
      this.room.rating = updatedRating;
    });
  }
}
