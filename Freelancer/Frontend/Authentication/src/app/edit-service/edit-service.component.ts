// import { Component,OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { EditServiceService } from '../services/edit-service.service';
// import { isEmpty } from 'rxjs';
// @Component({
//   selector: 'app-edit-service',
//   templateUrl: './edit-service.component.html',
//   styleUrl: './edit-service.component.scss'
// })
// export class EditServiceComponent  implements OnInit {
//   serviceId!:number;
//   editServiceForm: FormGroup;
//   services: any;
//   serviceTypes: any[] = [];
//   areas: any[] = [];
//   errors: any = {};
//   selectedServiceId: number | null = null;
//   constructor(private route: ActivatedRoute,private fb: FormBuilder,private router:Router,private editServiceService:EditServiceService) {
//     this.editServiceForm = this.fb.group({
//       service_title: ['', Validators.required],
//       service_desc: ['', Validators.required],
//       service_type: ['', Validators.required],
//       service_location: ['', Validators.required],
//       images: [null]
//     });

//   }
//   ngOnInit(): void {
//     this.route.queryParams.subscribe(params => {
//       if (params['selectedId']) { 
//         this.serviceId = params['selectedId'];
//         this.editServiceService.getMyServices(this.serviceId).subscribe(response=>{
//           this.services=response.service;
//           this.serviceTypes = response.service.service_types;
//           this.areas = response.service.areas;
//         });
//       }
//     });
//   }
//   onFileChange(event: any): void {
//     const input = event.target as HTMLInputElement;
//     if (input && input.files && input.files.length) {
//       const file = input.files[0];
//       this.editServiceForm.get('images')?.setValue(file);
//     }
//   }


//   onSubmit(): void {
//       const formData = new FormData();
//       formData.append('service_title', this.editServiceForm.get('service_title')==null?this.editServiceForm.get('service_title')?.value:this.services.service_title);
//       formData.append('service_desc', this.editServiceForm.get('service_desc')==null?this.editServiceForm.get('service_desc')?.value:this.services.service_desc);
//       formData.append('service_type', this.editServiceForm.get('service_type')==null?this.editServiceForm.get('service_type')?.value:this.services.service_type);
//       formData.append('service_location', this.editServiceForm.get('service_location')==null?this.editServiceForm.get('service_location')?.value:this.services.service_location);
//       const images = this.editServiceForm.get('images')?.value;
//       if (images) {
//         formData.append('images', images);
//       }
//       else{
//         formData.append('images',this.services.images);
//       }
//       this.editServiceService.submitEditService(formData,this.serviceId).subscribe(response => {
//         console.log('Service added successfully', response);
//         this.errors = {};
//         this.router.navigate(['/my-services']);
//       }, error => {
//         console.error('Error adding service', error);
//         this.errors = error.error;
//       });
    
//   }

// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditServiceService } from '../services/edit-service.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent implements OnInit {
  serviceId!: number;
  userId!: number;
  editServiceForm: FormGroup;
  services: any;

  serviceTypes: any[] = [];
  areas: any[] = [];
  errors: any = {};

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private editServiceService: EditServiceService
  ) {
    this.editServiceForm = this.fb.group({
      service_title: ['', Validators.required],
      service_desc: ['', Validators.required],
      service_type: ['', Validators.required],
      service_location: ['', Validators.required],
      images: [null]
    });
  }

  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   this.serviceId = +params['selectedId'];
    //   this.editServiceService.getMyServices(this.serviceId).subscribe(response => {
    this.route.queryParams.subscribe(params => {
      if (params['userid']) { 
        this.userId=params['userid'];
      }
      if (params['selectedId']) { 
        this.serviceId = params['selectedId'];
        this.editServiceService.getMyServices(this.serviceId).subscribe(response => {
        this.services = response.service;
        this.serviceTypes = response.service.service_types;
        this.areas = response.service.areas;
        this.editServiceForm.patchValue({
          service_title: this.services.service_title,
          service_desc: this.services.service_desc,
          service_type: this.services.service_type,
          service_location: this.services.service_location
        });
      });
    }
    });
  }

  onFileChange(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length) {
      const file = input.files[0];
      this.editServiceForm.get('images')?.setValue(file);
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('service_title', this.editServiceForm.get('service_title')?.value);
    formData.append('service_desc', this.editServiceForm.get('service_desc')?.value);
    formData.append('service_type', this.editServiceForm.get('service_type')?.value);
    formData.append('service_location', this.editServiceForm.get('service_location')?.value);

    const images = this.editServiceForm.get('images')?.value;
    if (images) {
      formData.append('images', images);
    }

    this.editServiceService.submitEditService(formData, this.serviceId).subscribe(response => {
      console.log('Service updated successfully', response);
      this.errors = {};
      // this.router.navigate(['/my-services']);
      this.router.navigate(['/my-services'], { queryParams: { username: this.userId } });
    }, error => {
      console.error('Error updating service', error);
      this.errors = error.error;
    });
  }
  onDelete(): void {
    this.editServiceService.deleteService(this.serviceId).subscribe(response => {
      console.log('Service deleted successfully', response);
      this.router.navigate(['/my-services'], { queryParams: { username: this.userId } });
      // this.router.navigate(['/my-services']);
    }, error => {
      console.error('Error deleting service', error);
    });
  }
}
