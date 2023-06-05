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

  totalPages = 0;
  limit = 10;

  formData = {
    name: '',
  };

  allResults: any[] = [];
  currentPage = 1;

  onSelectionChange(entry: any) {
    console.log(entry.value);
    this.limit = entry.value;
    this.isLoading = true;
    this.goToPage(1);
  }
  goToPage(n: number): void {
    this.currentPage = n;
    this.isLoading = true;
    this.getData(this.subjectName, this.currentPage,this.limit);
    // this.isLoading = false;
  }

  onSubmit() {
    // Handle the form submission logic
    console.log(this.formData.name); // Example: Log the form data to the console
    // redirect to the search results page
    // this.router.navigate(['/search-result/' + this.formData.name]);
    this.subjectName = this.formData.name;
    this.isLoading = true;
    this.getData(this.subjectName, this.currentPage, this.limit);
    this.showHome = false;
    this.showResult = true;
  }
  

  constructor(
    private SearchService: SearchService
  ) {}

  getData(value: string,currentPage: number,limit: number): Observable<any> {
    this.SearchService.getSearchBooks(value,currentPage,limit).subscribe((response: any) => {
      this.allResults = response.docs;
      // get whole number using Math.ceil

      this.totalPages = Math.ceil(response.numFound/limit);
      console.log(response);
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
