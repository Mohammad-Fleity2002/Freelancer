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

  constructor(private route: ActivatedRoute,private feedbackService: FeedbackService,private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['selectedId']) { 
        this.serviceId = params['selectedId'];
        this.feedbackService.getFeedbacks(this.serviceId).subscribe(response => {
          this.feedbacks = response.feedbacks;
        });
      }
    });
  }
  add_feedback():void{
    this.router.navigate(['/add-feedback'], { queryParams: { selectedId: this.serviceId } });
  }
}
