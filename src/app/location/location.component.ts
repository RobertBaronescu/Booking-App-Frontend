import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LocationService } from '../core/services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
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

  redirectToCity(index: number) {
    const city = this.locations[index];
    this.router.navigateByUrl(`/location/${city['_id']}`);
  }
}
