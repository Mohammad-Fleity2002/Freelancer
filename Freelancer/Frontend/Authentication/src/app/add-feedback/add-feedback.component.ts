import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddFeedbackService } from '../services/add-feedback.service';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.scss']
})
export class AddFeedbackComponent implements OnInit {
  addFeedbackForm: FormGroup;
  errors: any = {};
  serviceId!: number;
  serviceIdString!: string;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private addFeedbackService: AddFeedbackService, private router: Router) {
    this.addFeedbackForm = this.fb.group({
      feedback_content: ['', Validators.required],
      rate: ['', Validators.required],
      service_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['selectedId']) {
        this.serviceId = +params['selectedId']; // Ensure serviceId is a number
        this.serviceIdString = this.serviceId.toString();
        this.addFeedbackForm.patchValue({ service_id: this.serviceId });
      } 
    });
  }

  onSubmit(): void {
    if (this.addFeedbackForm.valid) {
      const formData = new FormData();
      formData.append('feedback_content', this.addFeedbackForm.get('feedback_content')?.value);
      formData.append('rate', this.addFeedbackForm.get('rate')?.value);
      formData.append('service_id', this.addFeedbackForm.get('service_id')?.value);

      this.addFeedbackService.submitAddFeedbackForm(formData).subscribe(response => {
        console.log('Feedback added successfully', response);
        this.errors = {};
        this.router.navigate(['/feedbacks'], { queryParams: { selectedId: this.serviceId } });
      }, error => {
        console.error('Error adding feedback', error);
        this.errors = error.error;
      });
    }
  }
}
