// src/app/search/search.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchService } from '../services/search.service';
import { FeedbackService } from '../services/feedback.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search-service.component.html',
  styleUrls: ['./search-service.component.scss']
})
export class SearchServiceComponent implements OnInit {
  searchForm: FormGroup;
  serviceTypes: any[] = [];
  areas: any[] = [];
  services: any[] = [];
  feedbacks: any[] = [];
  selectedServiceId: number | null = null;

  constructor(private fb: FormBuilder,private router:Router, private searchService: SearchService,private feedbackService: FeedbackService) {
    this.searchForm = this.fb.group({
      service_type: ['', Validators.required],
      area: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.searchService.getFormData().subscribe(data => {
      this.serviceTypes = data.service_types;
      this.areas = data.areas;
    });
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      this.searchService.searchServices(this.searchForm.value).subscribe(response => {
        this.services = response.services;
      }, error => {
        console.error('Error searching services', error);
      });
    }
  }
  viewFeedbacks(serviceId: number): void {
    this.selectedServiceId = serviceId;
    this.feedbackService.getFeedbacks(serviceId).subscribe(response => {
      this.feedbacks = response.feedbacks;
      // Navigate to the feedbacks route and pass feedbacks data as query parameters
      this.router.navigate(['/feedbacks'], { queryParams: { feedbacks: JSON.stringify(this.feedbacks) } });
    });
  }
}
