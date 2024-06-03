// import { Injectable } from '@angular/core';
// import { HttpClient,HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ServiceService {
//   private apiUrl = 'http://localhost:8000/search';  // Update this URL based on your Django backend URL

//   constructor(private http: HttpClient) { }

//   getAddServiceFormData(): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/add-service-form/`);
//   }

//   submitAddServiceForm(data: any): Observable<any> {
//     const headers = new HttpHeaders();  // No need to set Content-Type, let the browser set it to multipart/form-data
//     return this.http.post<any>(`${this.apiUrl}/add-service-form/`, {data});
//   }
//   // Other methods...
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://localhost:8000/search/add-service-form/';

  constructor(private http: HttpClient) {}

  getAddServiceFormData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  submitAddServiceForm(data: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
