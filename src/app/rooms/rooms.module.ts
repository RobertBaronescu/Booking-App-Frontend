import { NgModule } from '@angular/core';
import { RoomsLandingComponent } from './pages/rooms-landing/rooms-landing.component';
import { RoomSingleComponent } from './pages/room-single/room-single.component';
import { RoomsRoutingModule } from './rooms-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RoomsComponent } from './rooms.component';
import { RoomReviewsComponent } from './components/room-reviews/room-reviews.component';
import { RoomBookingComponent } from './components/room-booking/room-booking.component';
import { RoomAddReviewComponent } from './components/room-add-review/room-add-review.component';
import { RoomReviewStarsComponent } from './components/room-review-stars/room-review-stars.component';
import { CalculateRoomRatingComponent } from './components/calculate-room-rating/calculate-room-rating.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RoomsLandingComponent,
    RoomSingleComponent,
    RoomsComponent,
    RoomReviewsComponent,
    RoomBookingComponent,
    RoomAddReviewComponent,

    RoomReviewStarsComponent,
    CalculateRoomRatingComponent,
  ],
  imports: [RoomsRoutingModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class RoomsModule {}
