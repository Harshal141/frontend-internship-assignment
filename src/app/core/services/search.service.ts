import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { BookResponse } from 'src/app/core/models/book-response.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private apiService: ApiService) {}

  getSearchBooks(subjectName: string): Observable<BookResponse> {
    const limit = 10;
    return this.apiService.get(`/search.json?q=${encodeURIComponent(subjectName)}&limit=${limit}`);
  }
}
