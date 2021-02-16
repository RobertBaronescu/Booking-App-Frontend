import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Location } from '../../interfaces/location.interface';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss'],
})
export class LocationCardComponent implements OnInit {
  @Output() locationsEmitter = new EventEmitter<Location[]>(undefined);

  locations!: Location[];

  constructor(
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.locationService.getLocations().subscribe((locations) => {
      this.locations = locations;
      this.locationsEmitter.emit(locations);
    });
  }

  redirectToCity(index: number) {
    const city = this.locations[index];
    this.router.navigateByUrl(`/location/${city['_id']}`);
  }
}
