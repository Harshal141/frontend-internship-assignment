import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
// import { Book } from 'src/app/core/models/book-response.model';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../../core/services/search.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'front-end-internship-assignment-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
// export class TrendingSubjectsComponent implements OnInit {
export class searchResultComponent implements OnInit {

  isLoading = false;
  subjectName = '';
  
  allResults: any[] = [];
  resultsPerPage = 10;
  currentPage = 1;

  getTotalPages(): number {
    return Math.ceil(this.allResults.length / this.resultsPerPage);
  }

  getPaginatedResults(): any[] {
    const startIndex = (this.currentPage - 1) * this.resultsPerPage;
    const endIndex = startIndex + this.resultsPerPage;
    return this.allResults.slice(startIndex, endIndex);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage(): void {
    const maxPage = Math.ceil(this.allResults.length / this.resultsPerPage);
    if (this.currentPage < maxPage) {
      this.currentPage++;
    }
  }
  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }
  
  goToPage(page: number) {
    this.currentPage = page;
  }
  

  constructor(
    private route: ActivatedRoute,
    private SearchService: SearchService,
    private http: HttpClient
  ) {}

  // getAllBooks() {
  //   this.subjectsService.getAllBooks(this.subjectName).subscribe((data) => {
  //     this.allBooks = data?.works;
  //     // this.subjectsArray = data;
  //     this.isLoading = false;
  //   });
  // }
  getData(): Observable<any> {
    this.SearchService.getSearchBooks(this.subjectName).subscribe((response: any) => {
      this.allResults = response.docs;
      // this.subjectsArray = data;
      // console.log(this.books[0])
      this.isLoading = false;
    });
    return new Observable<any>();// Your data fetching logic here
  }
  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        // React to changes in the parameter value
        this.subjectName = params.get('name') || '';
        this.isLoading = true;
        // Perform any necessary logic based on the parameter value
        // Load data, make API calls, etc.
        return this.getData(); // Observable or Promise for data fetching if needed
      })
    ).subscribe();

    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   this.subjectName = params.get('name') || '';
    //   this.isLoading = true;
    //   // this.getAllBooks();
    // });
    // const apiUrl = `http://openlibrary.org/search.json?q=${encodeURIComponent(this.subjectName)}&limit=10`;
    

    // this.http.get(apiUrl).subscribe((response: any) => {
    //   this.books = response.docs;
    //   // this.subjectsArray = data;
    //   // console.log(this.books[0])
    //   this.isLoading = false;
    // });

    this.SearchService.getSearchBooks(this.subjectName).subscribe((response: any) => {
      this.allResults = response.docs;
      // this.subjectsArray = data;
      // console.log(this.books[0])
      this.isLoading = false;
    });
  }

}
