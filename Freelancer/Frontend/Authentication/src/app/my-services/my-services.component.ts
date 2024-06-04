import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{MyServicesServices}from '../services/my-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrl: './my-services.component.scss'
})
export class MyServicesComponent implements OnInit {
  username!:number;
  services: any[] = [];
  selectedServiceId: number | null = null;

  constructor(private route: ActivatedRoute,private myservice:MyServicesServices,private router:Router) {
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['username']) { 
        this.username = params['username'];
        this.myservice.getMyServices(this.username).subscribe(response => {
          this.services = response.services;
        });
      }
    });
  }
  viewFeedbacks(serviceId: number): void {
    this.selectedServiceId = serviceId;
    this.router.navigate(['/feedbacks'], { queryParams: { selectedId: serviceId } });
  }

  editService(serviceId: number): void {
    this.selectedServiceId = serviceId;
    this.router.navigate(['/edit-service'], { queryParams: { selectedId: serviceId } });
  }

}
