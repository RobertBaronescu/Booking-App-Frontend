import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingStartComponent } from './pages/booking-start/booking-start.component';
import { BookingSuccessComponent } from './pages/booking-success/booking-success.component';

const routes: Routes = [
  {
    path: 'start',
    component: BookingStartComponent,
  },
  { path: 'success', component: BookingSuccessComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
