import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AppRoutingModule } from './app-routing.module';
import { CsrfInterceptor } from './csrf.interceptor';
import { SearchServiceComponent } from './search-service/search-service.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { MyServicesComponent } from './my-services/my-services.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { AddFeedbackComponent } from './add-feedback/add-feedback.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ProfileComponent } from './profile/profile.component';
import { RatingToIntPipe } from './pipes/rating-to-int.pipe';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ChangePasswordComponent,
    SearchServiceComponent,
    AddServiceComponent,
    MyServicesComponent,
    ServiceDetailsComponent,
    EditServiceComponent,
    AddFeedbackComponent,
    NavbarComponent,
    FeedbackComponent,
    ProfileComponent,
    RatingToIntPipe,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
