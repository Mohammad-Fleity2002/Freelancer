import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/auth';

  // constructor(private http: HttpClient) {}
  constructor(private http: HttpClient) {
    this.getCsrfToken().subscribe();
  }


  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, { username, password });
  }

  signup(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup/`, { username, email, password });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout/`, {});
  }
  getUsername(): string {
    // Logic to get the username, e.g., from local storage or an API
    return 'JohnDoe';
  }
  getUserInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user-info/`);
  }
  isFreelancer(): boolean {
    // Logic to check if the user is a freelancer, e.g., from local storage or an API
    return true; // Set true/false based on actual check
  }
  getCsrfToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-csrf-token/`, { withCredentials: true });
  }
  getSignupForm(): Observable<any> {
    return this.http.get(`${this.apiUrl}/signup-form/`);
  }
  changePassword(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password/`, { username, password }, { withCredentials: true });
  }}
