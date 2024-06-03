import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // Make sure to create a service to handle authentication

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username!: string;
  isFreelancer: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(data => {
      this.username = data.username;
      this.isFreelancer = data.is_freelancer;
    });
  }
}
