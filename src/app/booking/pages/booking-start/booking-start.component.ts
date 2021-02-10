import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/core/interfaces/room.interface';
import { RoomService } from 'src/app/core/services/room.service';

@Component({
  selector: 'app-booking-start',
  templateUrl: './booking-start.component.html',
  styleUrls: ['./booking-start.component.scss'],
})
export class BookingStartComponent implements OnInit {
  room!: Room;
  startDate: any;
  endDate: any;
  numberOfDays: any;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.roomService.bookingDetails.subscribe((details) => {
      this.room = details.room;
      this.startDate = String(details.startDate).split(' ');
      this.endDate = String(details.endDate).split(' ');
      this.numberOfDays = details.numberOfDays;
    });
  }
}
