import { Component, OnInit } from '@angular/core';
import { BookingGuests } from 'src/app/core/interfaces/bookingGuests.interface';
import { Room } from 'src/app/core/interfaces/room.interface';
import { User } from 'src/app/core/interfaces/user.interface';
import { RoomService } from 'src/app/core/services/room.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-host-guests',
  templateUrl: './host-guests.component.html',
  styleUrls: ['./host-guests.component.scss'],
})
export class HostGuestsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
