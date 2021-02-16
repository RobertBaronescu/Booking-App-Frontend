import { Component, Input, OnInit } from '@angular/core';
import { BookingGuests } from 'src/app/core/interfaces/bookingGuests.interface';
import { User } from 'src/app/core/interfaces/user.interface';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-bookings-guests',
  templateUrl: './bookings-guests.component.html',
  styleUrls: ['./bookings-guests.component.scss'],
})
export class BookingsGuestsComponent implements OnInit {
  @Input() set isHost(value: boolean) {
    this._isHost = value;
    if (this._isHost) {
      this.userService.currentUser$.subscribe((user) => {
        this.userService
          .getBookingsByHost(user?._id)
          .subscribe((data: BookingGuests[]) => {
            this.bookings = data;
          });
      });
    } else {
      this.userService.currentUser$.subscribe((user) => {
        this.user = user;
        this.userService
          .getBookings(this.user?._id)
          .subscribe((bookings: BookingGuests[] | any) => {
            this.bookings = bookings;
          });
      });
    }
  }

  bookings!: BookingGuests[];
  user!: User | null;
  _isHost!: boolean;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  cancelBooking(bookingId: string) {
    this.userService.deleteBooking(bookingId).subscribe(() => {
      this.bookings = this.bookings.filter(
        (booking: { _id: string }) => booking._id !== bookingId
      );
    });
  }
}
