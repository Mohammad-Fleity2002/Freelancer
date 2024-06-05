import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AppComponent } from './app.component'; // if needed
import { SearchServiceComponent } from './search-service/search-service.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { ProfileComponent } from './profile/profile.component';
import { MyServicesComponent } from './my-services/my-services.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { AddFeedbackComponent } from './add-feedback/add-feedback.component';
import { FeedbackComponent } from './feedback/feedback.component'
import { EditProfileComponent } from './edit-profile/edit-profile.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'add-service', component: AddServiceComponent },
  { path: 'my-services', component: MyServicesComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'search-service', component: SearchServiceComponent },
  { path: 'service-details/:id', component: ServiceDetailsComponent },
  { path: 'edit-service', component: EditServiceComponent },
  { path: 'feedbacks', component: FeedbackComponent },
  { path: 'add-feedback', component: AddFeedbackComponent },
  { path: 'edit-profile', component: EditProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
