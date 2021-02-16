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
  guests!: string;
  guestFee!: number;
  initialPrice!: number;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.roomService.bookingDetails.subscribe((details) => {
      this.room = details.room;
      this.startDate = details.startDate;
      this.endDate = details.endDate;
      this.numberOfDays = details.numberOfDays;
      this.guests = details.guests;
      this.initialPrice = Number(this.room.price) * this.numberOfDays;
      this.guestFee =
        this.initialPrice * (((+this.guests.split(' ')[0] - 1) * 10) / 100);
      this.totalPrice = this.guestFee + this.initialPrice;
    });
  }
}
