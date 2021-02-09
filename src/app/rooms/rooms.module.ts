import { NgModule } from '@angular/core';
import { RoomsLandingComponent } from './pages/rooms-landing/rooms-landing.component';
import { RoomSingleComponent } from './pages/room-single/room-single.component';
import { RoomsRoutingModule } from './rooms-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RoomsComponent } from './rooms.component';
import { RoomReviewsComponent } from './components/room-reviews/room-reviews.component';
import { RoomBookingComponent } from './components/room-booking/room-booking.component';
import { RoomAddReviewComponent } from './components/room-add-review/room-add-review.component';
import { RoomBookingStepsComponent } from './components/room-booking-steps/room-booking-steps.component';
import { RoomReviewStarsComponent } from './components/room-review-stars/room-review-stars.component';
import { CalculateRoomRatingComponent } from './components/calculate-room-rating/calculate-room-rating.component';

@NgModule({
  declarations: [
    RoomsLandingComponent,
    RoomSingleComponent,
    RoomsComponent,
    RoomReviewsComponent,
    RoomBookingComponent,
    RoomAddReviewComponent,
    RoomBookingStepsComponent,
    RoomReviewStarsComponent,
    CalculateRoomRatingComponent,
    
  ],
  imports: [RoomsRoutingModule, SharedModule],
})
export class RoomsModule {}
