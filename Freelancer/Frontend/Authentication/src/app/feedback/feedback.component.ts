import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../services/feedback.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})

export class FeedbackComponent implements OnInit {
  feedbacks: any[] = [];
  selectedServiceId: number | null = null;
  serviceId!:number ;
  serviceTitle!:string;

  constructor(private route: ActivatedRoute,private feedbackService: FeedbackService,private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['selectedId']) { 
        this.serviceId = params['selectedId'];
        this.loadServiceTitle(this.serviceId);
        this.feedbackService.getFeedbacks(this.serviceId).subscribe(response => {
          this.feedbacks = response.feedbacks;
        });
      }
    });
  }
  loadServiceTitle(serviceId: number): void {
    // Assume getServiceTitle returns an observable that fetches the service title by ID
    this.feedbackService.getServiceTitle(serviceId).subscribe(response => {
      this.serviceTitle = response.title;
    }, error => {
      console.error('Error loading service title', error);
    });
  }
  add_feedback():void{
    this.router.navigate(['/add-feedback'], { queryParams: { selectedId: this.serviceId } });
  }
}
