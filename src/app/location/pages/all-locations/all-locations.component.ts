import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from '../../../core/services/location.service';

@Component({
  selector: 'all-locations',
  templateUrl: './all-locations.component.html',
  styleUrls: ['./all-locations.component.scss'],
})
export class AllLocationsComponent implements OnInit {
  locations: any;

  constructor(
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.locationService.getLocations().subscribe((locations) => {
      this.locations = locations;
    });
  }

  redirectToLocation(locationId: string) {
    this.router.navigate([`/location/${locationId}`]);
  }
}
