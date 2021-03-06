import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { range, result } from 'lodash';
import * as moment from 'moment';
import { Reservation } from 'src/app/core/interfaces/reservation.interface';
import { Room } from 'src/app/core/interfaces/room.interface';
import { User } from 'src/app/core/interfaces/user.interface';
import { RoomService } from 'src/app/core/services/room.service';
import { UserService } from 'src/app/core/services/user.service';

@UntilDestroy()
@Component({
  selector: 'app-room-booking',
  templateUrl: './room-booking.component.html',
  styleUrls: ['./room-booking.component.scss'],
})
export class RoomBookingComponent implements OnInit, OnDestroy {
  @Input() set room(value: Room) {
    if (value) {
      this._room = value;
      value.reservations.forEach((reservation: Reservation) => {
        const startDate = moment(reservation.startDate);
        const endDate = moment(reservation.endDate);
        const bookedRange = this.enumerateDaysBetweenDates(startDate, endDate);
        this.disabledCheckInDates.push(...bookedRange);
      });
    }
  }

  checkInDate!: Date;
  checkOutDate!: Date;
  currentUser!: User | null;
  guests = ['1 Guest', '2 Guests', '3 Guests', '4 Guests'];
  guestForm = new FormGroup({
    guests: new FormControl('1 Guest', Validators.required),
  });
  minDate: Date = new Date(2021, 0, 1);
  maxDate: Date = new Date(2021, 11, 31);
  disabledCheckInDates: Date[] = [];
  disabledCheckOutDates: Date[] = [new Date()];

  private _room!: Room;

  get room(): Room {
    return this._room;
  }

  constructor(
    private roomService: RoomService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.currentUser$
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.currentUser = user;
      });

    const startOfYear = moment(this.minDate);
    const toDate = moment(new Date(Date.now()));
    const results: Date[] = this.enumerateDaysBetweenDates(startOfYear, toDate);

    this.disabledCheckInDates.push(...results);
  }

  redirectToEditRoom() {
    this.router.navigate([`user/room/edit/${this.room._id}`]);
  }

  redirectToBooking() {
    const guests = +this.guestForm.get('guests')?.value.split(' ')[0];

    const numberOfDays = moment
      .duration(moment(this.checkOutDate).diff(moment(this.checkInDate)))
      .asDays();

    const finalPrice =
      Number(this.room.price) * numberOfDays +
      (Number(this.room.price) * numberOfDays * (guests - 1) * 10) / 100;

    const bookingDetails = {
      room: this.room,
      startDate: this.checkInDate,
      endDate: this.checkOutDate,
      numberOfDays: numberOfDays,
      price: finalPrice,
      guests: this.guestForm.get('guests')?.value,
      userId: this.currentUser!._id,
      roomId: this.room._id,
    };

    this.roomService.bookingDetails.next(bookingDetails);
    this.router.navigate(['/booking/start']);
  }

  onCheckInDateChange(value: Date) {
    this.checkInDate = value;

    this.disabledCheckOutDates = [];
    this.checkOutDate = new Date();

    const rangeBeforeCheckIn = this.enumerateDaysBetweenDates(
      moment(new Date(2021, 0, 1)),
      moment(value)
    );

    this.disabledCheckOutDates = this.filterUniqueDates([
      ...rangeBeforeCheckIn,
      ...this.disabledCheckInDates,
      value,
    ]);

    const foundFirstDateAfterCheckIn = this.disabledCheckInDates.find(
      (date) => new Date(date).getTime() > new Date(value).getTime()
    );

    if (foundFirstDateAfterCheckIn) {
      const disabledRange = this.enumerateDaysBetweenDates(
        moment(foundFirstDateAfterCheckIn),
        moment(this.maxDate)
      );
      this.disabledCheckOutDates = this.filterUniqueDates([
        ...this.disabledCheckOutDates,
        ...disabledRange,
      ]);
    }
  }

  onCheckOutDateChange(value: Date) {
    this.checkOutDate = value;
  }

  enumerateDaysBetweenDates(startDate: any, endDate: any): Date[] {
    const now = startDate.startOf('day');
    const dates = [];

    while (now.isBefore(endDate.startOf('day'))) {
      dates.push(new Date(now));
      now.add(1, 'days');
    }

    return dates;
  }

  sortDatesAscending(dateArray: Date[]): Date[] {
    return [
      ...dateArray.sort(
        (a, b) => new Date(b).getTime() - new Date(a).getTime()
      ),
    ];
  }

  filterUniqueDates(data: Date[]) {
    const lookup = new Set();

    return data.filter((date) => {
      const serialised = date.getTime();
      if (lookup.has(serialised)) {
        return false;
      } else {
        lookup.add(serialised);
        return true;
      }
    });
  }

  ngOnDestroy(): void {}
}
