import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errors: any ={};

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(response => {
      console.log('Login successful', response);
      this.errors={};
    }, error => {
      console.error('Login failed', error);
      this.errors=error.error;
    });
  }
}
