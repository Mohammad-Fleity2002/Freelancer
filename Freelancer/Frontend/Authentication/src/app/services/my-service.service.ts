import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyServicesServices {

  private apiUrl = 'http://localhost:8000/search/my-service/';

  constructor(private http: HttpClient) { }

  getMyServices(userid: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${userid}/`);
  }
}
