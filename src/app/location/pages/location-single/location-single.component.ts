import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Room } from '../../../core/interfaces/room.interface';
import { LocationService } from '../../../core/services/location.service';

@Component({
  selector: 'app-location-single',
  templateUrl: './location-single.component.html',
  styleUrls: ['./location-single.component.scss'],
})
export class LocationSingleComponent implements OnInit {
  location: Location | any;
  rooms!: Room[];
  locationImage!: string;

  roomsCityName: any;

  constructor(
    private locationService: LocationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.locationService.getLocation(String(id)).subscribe((location) => {
      this.location = location;
      this.rooms = location.rooms;
      this.locationImage = String(location.image);
    });
  }

  redirectToRoom(roomId: string) {
    const locationId = this.route.snapshot.paramMap.get('id');
    this.router.navigate([`location/${locationId}/rooms/${roomId}`]);
  }
}
