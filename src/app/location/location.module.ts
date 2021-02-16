import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationRoutingModule } from './location-routing.module';
import { AllLocationsComponent } from './pages/all-locations/all-locations.component';
import { LocationSingleComponent } from './pages/location-single/location-single.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AllLocationsComponent, LocationSingleComponent],
  imports: [LocationRoutingModule, SharedModule],
})
export class LocationModule {}
