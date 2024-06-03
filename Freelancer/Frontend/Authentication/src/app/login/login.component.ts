import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errors: any ={};

  constructor(private authService: AuthService,private router:Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(response => {
      console.log('Login successful', response);
      this.errors={};
      this.router.navigate(['/search-service']);
    }, error => {
      console.error('Login failed', error);
      this.errors=error.error;
    });
  }
  goToSignup(): void {
    this.router.navigate(['/signup']);
  }

  goToChangePassword(): void {
    this.router.navigate(['/change-password']);
  }
}
