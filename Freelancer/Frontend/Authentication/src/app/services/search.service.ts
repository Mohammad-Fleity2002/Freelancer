// src/app/services/search.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'http://localhost:8000/search/search-service/';

  constructor(private http: HttpClient) {}

  getFormData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  searchServices(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
