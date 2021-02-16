import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/core/interfaces/room.interface';
import { User } from 'src/app/core/interfaces/user.interface';
import { RoomService } from 'src/app/core/services/room.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.scss'],
})
export class UserBookingsComponent implements OnInit {


  constructor(

  ) {}

  ngOnInit(): void {

  }

 
}
