import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@progress/kendo-angular-dropdowns';
import { ApplicationHeaderComponent } from './components/application-header/application-header.component';
import { ApplicationFooterComponent } from './components/application-footer/application-footer.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { ApplicationUserIconComponent } from './components/application-user-icon/application-user-icon.component';
import { StepOneComponent } from './rooms/components/room-booking-steps/step-one/step-one.component';
import { BookingCardComponent } from './rooms/components/room-booking-steps/booking-card/booking-card.component';
import { StepTwoComponent } from './booking/pages/booking-success/booking-success.component';
import { VisitorBookingsComponent } from './bookings/visitor-bookings/visitor-bookings.component';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationHeaderComponent,
    ApplicationFooterComponent,
    ApplicationUserIconComponent,
    StepOneComponent,
    StepTwoComponent,
    BookingCardComponent,
    VisitorBookingsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
