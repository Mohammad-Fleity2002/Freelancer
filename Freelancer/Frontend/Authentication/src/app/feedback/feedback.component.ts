import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})

export class FeedbackComponent implements OnInit {
  feedbacks: any[] = [];
  selectedServiceId: number | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Extract feedbacks data from query parameters
    this.route.queryParams.subscribe(params => {
      if (params['feedbacks']) { // Access 'feedbacks' using ['feedbacks']
        this.feedbacks = JSON.parse(params['feedbacks']);
      }
    });
  }
}
