import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userId: string | null = null;
  userData: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['user_id'];
      if (this.userId) {
        this.fetchUserData();
      }
    });
  }

  fetchUserData(): void {
    if (this.userId) {
      this.profileService.getUserInfo(this.userId).subscribe(data => {
        this.userData = data;
      });
    }
  }

  editProfile():void{
    this.router.navigate(['/edit-profile'], { queryParams: { userid: this.userId } });
  }
}
