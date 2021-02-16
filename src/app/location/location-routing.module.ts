import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllLocationsComponent } from './pages/all-locations/all-locations.component';
import { LocationSingleComponent } from './pages/location-single/location-single.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: AllLocationsComponent },
  {
    path: ':id',
    component: LocationSingleComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationRoutingModule {}
