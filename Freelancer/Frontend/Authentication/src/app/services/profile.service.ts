import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'http://localhost:8000/search/user-info/';

  constructor(private http: HttpClient) { }

  getUserInfo(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?user_id=${userId}`);
  }
}
