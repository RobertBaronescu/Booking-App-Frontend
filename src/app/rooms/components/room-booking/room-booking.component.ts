import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/core/interfaces/room.interface';
import { RoomService } from 'src/app/core/services/room.service';

@Component({
  selector: 'app-room-booking',
  templateUrl: './room-booking.component.html',
  styleUrls: ['./room-booking.component.scss'],
})
export class RoomBookingComponent implements OnInit {
  room!: Room;
  startDate: Date = new Date(Date.now());
  endDate: Date = new Date(Date.now() + 1);

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

  disabledDates(date: Date): boolean {
    return date <= new Date();
  }
}
