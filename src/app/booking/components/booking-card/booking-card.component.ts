import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/core/interfaces/room.interface';
import { RoomService } from 'src/app/core/services/room.service';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss'],
})
export class BookingCardComponent implements OnInit {
  room!: Room;
  startDate!: Date;
  endDate!: Date;
  numberOfDays!: number;
  totalPrice!: number;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.roomService.bookingDetails.subscribe((details) => {
      this.room = details.room;
      this.startDate = details.startDate;
      this.endDate = details.endDate;
      this.numberOfDays = details.numberOfDays;
      this.totalPrice =
        Number(this.room.price.split('').splice(1).join('')) *
        this.numberOfDays;
    });
  }
}
