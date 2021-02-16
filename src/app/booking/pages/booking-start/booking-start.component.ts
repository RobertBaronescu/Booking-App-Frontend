import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/app/core/interfaces/booking.interface';
import { Room } from 'src/app/core/interfaces/room.interface';
import { RoomService } from 'src/app/core/services/room.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-booking-start',
  templateUrl: './booking-start.component.html',
  styleUrls: ['./booking-start.component.scss'],
})
export class BookingStartComponent implements OnInit {
  room!: Room;
  numberOfDays!: number;
  bookingDetails: any;

  constructor(
    private roomService: RoomService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roomService.bookingDetails.subscribe((details) => {
      this.bookingDetails = { ...details };
      this.room = details.room;
      this.numberOfDays = details.numberOfDays;
    });
  }

  finishBooking() {
    const { room, ...booking } = this.bookingDetails;
    const payload: Booking = { ...booking, hostId: room.hostId };

    this.userService.createBooking(payload).subscribe(() => {
      this.router.navigate(['/booking/success']);
    });
  }
}
