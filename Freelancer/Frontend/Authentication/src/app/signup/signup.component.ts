import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../services/signup.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  groupChoices: any[];
  errors:any={};

  constructor(private fb: FormBuilder, private signupService: SignupService,private router:Router) {
    // Initialize the form with default values
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      group: ['', Validators.required]
    });

    this.groupChoices = [];
  }

  ngOnInit(): void {
    this.signupService.getFormData().subscribe(response => {
      const formData = response.initial_data;
      this.groupChoices = response.choices.group;

      // Update the form with the fetched data
      this.signupForm.patchValue({
        username: formData.username,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password1: formData.password1,
        password2: formData.password2,
        group: formData.group
      });
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.signupService.submitForm(this.signupForm.value).subscribe(response => {
        console.log('User created successfully', response);
        this.errors={};
        this.router.navigate(['/login']);
      }, error => {
        console.error('Error creating user', error);
        this.errors=error.error;
      });
    }
  }
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

}
