import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private apiUrl = 'http://localhost:8000/search/feedbacks/';
  private apiUrl2 = 'http://localhost:8000/search'; 
  constructor(private http: HttpClient) { }

  getFeedbacks(serviceId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${serviceId}/`);
  }
  getServiceTitle(serviceId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}/services/${serviceId}/title`);
  }

}
