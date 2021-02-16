import { NgModule } from '@angular/core';

import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { CoreRoutingModule } from './core-routing.module';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../shared/authconfig.interceptor';
import { SharedModule } from '../shared/shared.module';
import { LocationCardComponent } from './components/location-card/location-card.component';

@NgModule({
  declarations: [
    HomeComponent,
    LocationCardComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    CoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class CoreModule {}
