import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {
  userid!:number;
  addServiceForm: FormGroup;
  serviceTypeChoices: any[];
  serviceLocationChoices: any[];
  errors: any = {};
  // userId!=number;

  constructor(private fb: FormBuilder, private serviceService: ServiceService, private router: Router,private route:ActivatedRoute) {
    this.addServiceForm = this.fb.group({
      service_title: ['', Validators.required],
      service_desc: ['', Validators.required],
      service_type: ['', Validators.required],
      service_location: ['', Validators.required],
      images: [null]
    });

    this.serviceTypeChoices = [];
    this.serviceLocationChoices = [];
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['selectedId']) { 
        this.userid=params['selectedId'];
      }
    });
    this.serviceService.getAddServiceFormData().subscribe(response => {
      const formData = response.initial_data;
      this.serviceTypeChoices = response.choices.service_type;
      this.serviceLocationChoices = response.choices.service_location;

      this.addServiceForm.patchValue({
        service_title: formData.service_title,
        service_desc: formData.service_desc,
        service_type: formData.service_type,
        service_location: formData.service_location,
        images: formData.images
      });
    });
  }

  onFileChange(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length) {
      const file = input.files[0];
      this.addServiceForm.get('images')?.setValue(file);
    }
  }

  onSubmit(): void {
    if (this.addServiceForm.valid) {
      const formData = new FormData();
      formData.append('service_title', this.addServiceForm.get('service_title')?.value);
      formData.append('service_desc', this.addServiceForm.get('service_desc')?.value);
      formData.append('service_type', this.addServiceForm.get('service_type')?.value);
      formData.append('service_location', this.addServiceForm.get('service_location')?.value);
      const images = this.addServiceForm.get('images')?.value;
      if (images) {
        formData.append('images', images);
      }

      this.serviceService.submitAddServiceForm(formData).subscribe(response => {
        console.log('Service added successfully', response);
        this.errors = {};
        // this.router.navigate(['/my-services']);
        this.router.navigate(['/my-services'], { queryParams: { username: this.userid } });
      }, error => {
        console.error('Error adding service', error);
        this.errors = error.error;
      });
    }
  }
}
