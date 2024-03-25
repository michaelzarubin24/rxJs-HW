import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  fetchData(endpoint: string): Observable<any> {
    return this.http.get(`https://jsonplaceholder.typicode.com/${endpoint}`);
  }
}
