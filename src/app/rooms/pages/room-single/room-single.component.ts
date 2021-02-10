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
  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('roomId');
    const locationId = this.route.snapshot.paramMap.get('id');
    this.roomService
      .getRoom(String(id), String(locationId))
      .subscribe((room) => {
        this.room = room;
      });
  }

  onReviewAdd(review: Review) {
    this.room.reviews.push(review);
  }
}
