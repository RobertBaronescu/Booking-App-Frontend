import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '../../interfaces/location.interface';
import { Room } from '../../interfaces/room.interface';
import { LocationService } from '../../services/location.service';
import { RoomService } from '../../services/room.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  listItems: Array<string> = [];
  locationForm = new FormGroup({
    location: new FormControl('', Validators.required),
  });
  locations!: Location[];
  bestRatedRooms!: Room[];

  constructor(
    private userService: UserService,
    public locationService: LocationService,
    private router: Router,
    private roomService: RoomService
  ) {}

  onLocationsEmit(locations: Location[]) {
    this.locations = [...locations];
    locations.forEach((location) => {
      this.listItems.push(location.name);
    });
  }

  formSubmit() {
    this.locations.forEach((location) => {
      if (location.name === this.locationForm.get('location')?.value) {
        this.router.navigate([`/location/${location._id}`]);
      }
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe();

    this.roomService.getBestRatedRooms().subscribe((rooms) => {
      this.bestRatedRooms = [...rooms];
      console.log(this.bestRatedRooms);
    });
  }

  redirectToRoom(roomId: string) {
    this.router.navigate([`/room/${roomId}`]);
  }
}
