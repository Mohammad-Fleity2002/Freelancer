import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  private apiUrl = 'http://localhost:8000/search';

  constructor(private http: HttpClient) { }

  getUserProfile(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user-profile?user_id=${userId}`);
  }

  updateUserProfile(userId: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/user-profile-update?user_id=${userId}`, data);
  }}
