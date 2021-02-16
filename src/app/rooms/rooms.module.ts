import { NgModule } from '@angular/core';
import { RoomSingleComponent } from './pages/room-single/room-single.component';
import { RoomsRoutingModule } from './rooms-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RoomReviewsComponent } from './components/room-reviews/room-reviews.component';
import { RoomBookingComponent } from './components/room-booking/room-booking.component';
import { RoomAddReviewComponent } from './components/room-add-review/room-add-review.component';
import { RoomReviewStarsComponent } from './components/room-review-stars/room-review-stars.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RoomSingleComponent,
    RoomReviewsComponent,
    RoomBookingComponent,
    RoomAddReviewComponent,
    RoomReviewStarsComponent,
  ],
  imports: [RoomsRoutingModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class RoomsModule {}
