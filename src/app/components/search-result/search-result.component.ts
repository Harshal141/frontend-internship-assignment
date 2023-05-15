import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SubjectsService } from '../../core/services/subjects.service';
// import { Book } from 'src/app/core/models/book-response.model';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../../core/services/search.service';

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

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.subjectName = params.get('name') || '';
      this.isLoading = true;
      // this.getAllBooks();
    });
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
