import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  resources: string[] = [
    'posts',
    'comments',
    'albums',
    'photos',
    'todos',
    'users',
  ];
  fetchedData: { endpoint: string; data: any; error: any }[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    const requests: Observable<any>[] = this.resources.map((endpoint) =>
      this.dataService
        .fetchData(endpoint)
        .pipe(catchError((error) => throwError(() => ({ endpoint, error }))))
    );

    forkJoin(requests).subscribe({
      next: (data) => {
        this.fetchedData = data.map((response, index) => ({
          endpoint: this.resources[index],
          data: response,
          error: null,
        }));
      },
      error: (err) => {
        this.fetchedData.push({
          endpoint: err.endpoint,
          data: null,
          error: err.error,
        });
      },
    });
  }
}
