import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
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
    this._room = value;
    // this.disabledDates.push(this._room.reservations)
    // this._room?.reservations.forEach((reservation) => {
    //   this.disabledDates.push(new Date(reservation.startDate));
    //   this.disabledDates.push(new Date(reservation.endDate));
    // });
    RoomBookingComponent.reservations = this._room?.reservations;
  }

  startDate: Date = new Date(Date.now());
  endDate: Date = new Date(Date.now());
  currentUser!: User | null;
  guests = ['1 Guest', '2 Guests', '3 Guests', '4 Guests'];
  guestForm = new FormGroup({
    guests: new FormControl('1 Guest', Validators.required),
  });
  // disabledDates: Date[] = [new Date(Date.now())];
  static reservations: Date[];

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
  }

  disabledDates(date: Date): boolean {
    // return (
    //   date < new Date(Date.now()) &&
    //   RoomBookingComponent.checkReservations(date)
    // );
    if (date < new Date(Date.now())) {
      return true;
    }
    RoomBookingComponent.reservations.forEach((reservation: any) => {
      if (
        date < new Date(reservation.startDate) &&
        date > new Date(Date.now())
      ) {
        return true;
      }
      if (
        date > new Date(reservation.startDate) &&
        date < new Date(reservation.endDate)
      ) {
        return false;
      }
      return true;
    });
    return true;
  }

  // static checkReservations(date: Date): boolean {
  //   RoomBookingComponent.reservations.forEach((reservation: any) => {
  //     if (
  //       moment(date).isBetween(
  //         new Date(reservation.startDate),
  //         new Date(reservation.endDate)
  //       )
  //     ) {
  //       return true;
  //     }
  //     return false;
  //   });
  //   return false;
  // }

  redirectToBooking() {
    const guests = +this.guestForm.get('guests')?.value.split(' ')[0];

    const numberOfDays = moment
      .duration(moment(this.endDate).diff(moment(this.startDate)))
      .asDays();

    const finalPrice =
      Number(this.room.price) * numberOfDays +
      (Number(this.room.price) * numberOfDays * (guests - 1) * 10) / 100;

    const bookingDetails = {
      room: this.room,
      startDate: this.startDate,
      endDate: this.endDate,
      numberOfDays: numberOfDays,
      price: finalPrice,
      guests: this.guestForm.get('guests')?.value,
      userId: this.currentUser!._id,
      roomId: this.room._id,
    };

    this.roomService.bookingDetails.next(bookingDetails);
    this.router.navigate(['/booking/start']);
  }

  ngOnDestroy(): void {}
}
