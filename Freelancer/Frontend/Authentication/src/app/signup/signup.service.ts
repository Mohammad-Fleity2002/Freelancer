import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl = 'http://localhost:8000/auth/signup-form/';

  constructor(private http: HttpClient) {}

  getFormData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  submitForm(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, {data});
  }
}
