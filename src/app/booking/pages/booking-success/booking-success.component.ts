import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/core/services/room.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.scss'],
})
export class BookingSuccessComponent implements OnInit {
  currentUser: any;

  constructor(
    private userService: UserService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.userService.currentUser$.subscribe((user) => {
      this.currentUser = { ...user };
    });
  }

}
