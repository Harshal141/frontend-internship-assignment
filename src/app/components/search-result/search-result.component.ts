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
export class searchResultComponent {
  showHome = true;
  showResult = false;

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  formData = {
    name: '',
    // Add more properties for other form controls
  };

  isLoading = false;
  subjectName = '';
  
  allResults: any[] = [];
  resultsPerPage = 10;
  currentPage = 1;

  onSubmit() {
    // Handle the form submission logic
    console.log(this.formData.name); // Example: Log the form data to the console
    // redirect to the search results page
    // this.router.navigate(['/search-result/' + this.formData.name]);
    this.subjectName = this.formData.name;
    this.isLoading = true;
    this.getData(this.subjectName);
    this.isLoading = false;
    this.showHome = false;
    this.showResult = true;
  }

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
  getData(value: string): Observable<any> {
    // this.SearchService.getSearchBooks(value).subscribe((response: any) => {
    //   this.allResults = response.docs;
    //   this.isLoading = false;
    // });
    return new Observable<any>();// Your data fetching logic here
  }
  
}
