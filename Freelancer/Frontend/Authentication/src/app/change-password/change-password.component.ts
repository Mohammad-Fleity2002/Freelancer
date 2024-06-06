import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class  ChangePasswordComponent {
  username: string = '';
  password: string = '';
  errors: any={};

  constructor(private authService: AuthService,private router:Router) {}

  changePassword() {
    this.authService.changePassword(this.username, this.password).subscribe(response => {
      console.log('password changed successful', response);
      this.errors={};
      this.router.navigate(['/login']);
    }, error => {
      console.error('password changed failed', error);
      this.errors=error.error;
    });
  }
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

}
