import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllLocationsComponent } from './location/pages/all-locations/all-locations.component';
import { LocationSingleComponent } from './location/pages/location-single/location-single.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'location',
    loadChildren: () =>
      import('./location/location.module').then((m) => m.LocationModule),
  },

  {
    path: 'booking',
    loadChildren: () =>
      import('./booking/booking.module').then((m) => m.BookingModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
