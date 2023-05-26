import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
// import { Book } from 'src/app/core/models/book-response.model';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../../core/services/search.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showHome = true;
  showResult = false;
  isLoading = false;
  subjectName = '';

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  formData = {
    name: '',
  };

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
    private router : Router,
    private SearchService: SearchService,
    private http: HttpClient
  ) {}

  getData(value: string): Observable<any> {
    this.SearchService.getSearchBooks(value).subscribe((response: any) => {
      this.allResults = response.docs;
      this.isLoading = false;
    });
    return new Observable<any>();// Your data fetching logic here
  }

  navigateToHome(){
    this.showHome = true;
    this.showResult = false;
    this.clearChat();
  }
  clearChat(){
    this.formData = {
      name: '',
    };
  }
  
  ngOnInit() {
    this.navigateToHome();
  }

}
