import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddFeedbackService {
  private apiUrl = 'http://localhost:8000/search/add-feedback/';

  constructor(private http: HttpClient) {}

  getAddFeedbackFormData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  submitAddFeedbackForm(data: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
