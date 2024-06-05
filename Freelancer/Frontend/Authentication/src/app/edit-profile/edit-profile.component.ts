import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import { EditProfileService } from '../services/edit-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  user: any;
  errors: any = {};
  userId: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private profileService: EditProfileService,
    private router: Router
  ) {
    this.editProfileForm = this.fb.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['userid']) {
        this.userId = params['userid'];
        this.loadUserProfile(this.userId);
      }
    });
  }

  loadUserProfile(userId: string): void {
    this.profileService.getUserProfile(userId).subscribe(response => {
      this.user = response.user;
      this.editProfileForm.patchValue({
        username: this.user.username,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email
      });
    }, error => {
      console.error('Error loading user profile', error);
    });
  }

  onSubmit(): void {
    const formData = this.editProfileForm.value;
    this.profileService.updateUserProfile(this.userId, formData).subscribe(response => {
      console.log('Profile updated successfully', response);
      this.errors = {};
      this.router.navigate(['/profile'], { queryParams: { user_id: this.userId } });
    }, error => {
      console.error('Error updating profile', error);
      this.errors = error.error;
    });
  }
}
