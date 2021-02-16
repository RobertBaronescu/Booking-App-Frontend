import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingRoutingModule } from './booking-routing.module';
import { BookingCardComponent } from './components/booking-card/booking-card.component';
import { BookingStartComponent } from './pages/booking-start/booking-start.component';
import { BookingSuccessComponent } from './pages/booking-success/booking-success.component';
import { MomentPipe } from '../core/pipes/moment.pipe';

@NgModule({
  declarations: [
    BookingCardComponent,
    BookingStartComponent,
    BookingSuccessComponent,
    MomentPipe,
  ],
  imports: [CommonModule, BookingRoutingModule],
})
export class BookingModule {}
