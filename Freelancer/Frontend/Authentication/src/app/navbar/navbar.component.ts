import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // Make sure to create a service to handle authentication
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username!: string;
  userid!:number;
  isFreelancer: boolean = false;

  constructor(private authService: AuthService,private router:Router) { }

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(data => {
      this.username = data.username;
      this.userid=data.userid;
      this.isFreelancer = data.is_freelancer;
    });
  }
  toMyService():void{
    this.router.navigate(['/my-services'], { queryParams: { username: this.userid } });
  }
  toProfile():void{
    this.router.navigate(['/profile'], { queryParams: { user_id: this.userid } });
  }
  logout():void{
    this.authService.logout().subscribe(response => {
      console.log('User lougged out successfully', response);
      this.router.navigate(['/login']);
    }, error => {
      console.error('Error logging out user', error);
    });
  }
}
