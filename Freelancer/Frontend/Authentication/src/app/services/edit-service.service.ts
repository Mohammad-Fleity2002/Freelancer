// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class EditServiceService {

//   private apiUrl = 'http://localhost:8000/search/edit-service/';

//   constructor(private http: HttpClient) { }

//   getMyServices(serviceid: number): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}${serviceid}/`);
//   }
//   submitEditService(data: FormData,serviceid: number): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}${serviceid}/`, data);
//   }

// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditServiceService {
  private apiUrl = 'http://localhost:8000/search/edit-service/';
  private apiUrl2 = 'http://localhost:8000/search';

  constructor(private http: HttpClient) {}

  getMyServices(serviceId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${serviceId}/`);
  }

  submitEditService(data: FormData, serviceId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${serviceId}/`, data);
  }
  deleteService(serviceid: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl2}/delete-service/${serviceid}/`);
  }
}
